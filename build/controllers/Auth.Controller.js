"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authcontroller = void 0;
const database_1 = __importDefault(require("../database"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const md5_1 = __importDefault(require("md5"));
const mailer_1 = require("../config/mailer");
const otpgenerato_1 = require("../config/otpgenerato");
//los controladores no necesitan inicializacion 
const savedOTPS = {};
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //para recoger las variables de la aplicacion
            const { user, password } = req.body;
            //si NO hay algo en estos valores de una respuesta
            if (!(user && password)) {
                res.status(404).json({ message: 'Usuario y Contraseña es requerido' });
                return;
            }
            //signos de ? aperson sirven para dar valor 
            let pass;
            if (password) {
                pass = (0, md5_1.default)(password);
            }
            yield database_1.default.query('select * from login where user = ? and password = ?', [user, pass], (err, result) => {
                if (err)
                    throw err;
                //SI HAY EL CAMPO PONGA EL OK 
                if (result.length) {
                    const token = jwt.sign({ idusuario: result[0].idusuario,
                        Id_rol: result[0].Id_rol, id_negocio: result[0].id_negocio }, config_1.default.jwtSecret, { expiresIn: '24h' });
                    return res.json({ message: 'OK', token, idusuario: result[0].idusuario, Id_rol: result[0].Id_rol, id_negocio: result[0].id_negocio });
                }
                res.status(404).json({ text: 'Usuario no existe' });
            });
        });
    }
    sendemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield database_1.default.query('SELECT * FROM usuario WHERE correo = ?', [email], (err, result) => {
                    if (err)
                        throw err;
                    if (result.length > 0) {
                        const data = result[0];
                        const otp = (0, otpgenerato_1.generateOTP)();
                        mailer_1.transporter.sendMail({
                            from: '"Centro Comercial Popular 👻" <popularcentrocomercial@gmail.com>',
                            to: data.correo,
                            subject: "Código de Recuperación",
                            html: `
              <h1>Centro Comercial Popular</h1>
              <h3>hola!: ${data.nombre}</h3>
              <br>
              <p>Código OTP de recuperacion de contraseña</p>
              <h1>${otp} </h1>
              `, // html body
                        });
                        savedOTPS[email] = otp;
                        setTimeout(() => {
                            delete savedOTPS[email];
                        }, 300000);
                        res.json({
                            message: 'Message enviado corectamente',
                        });
                        return;
                    }
                    res.status(404).json({ message: 'No hay ningun usuario con ese email' });
                });
            }
            catch (e) {
                const emailStatus = e;
                res.status(404).json({ message: 'something goes wrong!' });
            }
        });
    }
    checkotp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = req.body;
            console.log(savedOTPS[email]);
            if (savedOTPS[email] == otp) {
                yield database_1.default.query('SELECT * FROM usuario WHERE correo = ?', [email], (err, result) => {
                    if (err)
                        throw err;
                    if (result.length > 0) {
                        const data = result[0];
                        const id = jwt.sign({
                            idusuario: data.idusuario
                        }, config_1.default.jwtSecret, { expiresIn: '5m' });
                        res.json({
                            message: 'ok',
                            token: id
                        });
                    }
                });
                return;
            }
            res.status(404).json({ message: 'error' });
        });
    }
    resetPasword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { password, password2 } = req.body;
            try {
                const idcode = jwt.verify(id, config_1.default.jwtSecret);
                console.log(idcode);
                if (!(password && password2)) {
                    res.status(404).json({ message: 'campos requeridos requerido' });
                    return;
                }
                if (!(password === password2)) {
                    res.status(404).json({ message: 'Contraseña No son iguales' });
                }
                let pass;
                if (password) {
                    pass = (0, md5_1.default)(password);
                }
                yield database_1.default.query('UPDATE usuario SET password = ? WHERE Estado = 1 AND idusuario = ?', [pass, idcode.idusuario], (err, result) => {
                    if (err)
                        throw err;
                    console.log(result);
                    if (result) {
                        res.json({ message: 'contraseñas actualizadas' });
                        return;
                    }
                    res.status(404).json({ message: 'erro al canbiar la contraseña' });
                });
            }
            catch (err) {
                res.status(404).json(err);
            }
        });
    }
}
exports.authcontroller = new AuthController;
