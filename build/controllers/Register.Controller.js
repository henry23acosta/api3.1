"use strict";
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
exports.registerController = void 0;
const database_1 = __importDefault(require("../database"));
const md5_1 = __importDefault(require("md5"));
const passport_1 = __importDefault(require("passport"));
require("../config/config.passport");
class RegisterController {
    checklogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM usuario', (err, result) => {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, user, password, telefono, correo, Estado } = req.body;
            let pass = (0, md5_1.default)(password);
            if (!(nombre && user && password && telefono && correo && Estado)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('call crearusuarionuevo(?,?,?,?,?,?)', [nombre, user, pass, telefono, correo, Estado], (err, result) => {
                if (err)
                    throw err;
                res.json({ message: 'Usuario Creado', result: result[0] });
            });
        });
    }
    GoogleAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('google', { scope: ['profile', 'email'] });
            res.send('hola');
        });
    }
    googlecallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('google');
            res.send('redict');
        });
    }
}
exports.registerController = new RegisterController;
