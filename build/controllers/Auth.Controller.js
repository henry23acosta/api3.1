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
//los controladores no necesitan inicializacion 
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
}
exports.authcontroller = new AuthController;
