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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chekjwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
//exportamos la clave de seguridad de la aplicacion, si esta logeado generara el token 
//luego genera la funcion - en el header 
const chekjwt = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    //controlador del token, genera la clave secreta con jwtsecret
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
        //para probar 
    }
    catch (e) {
        //envia una pagina de error 
        return res.status(401).json({ 'messaje': 'no autorizado' });
    }
    //generar un token para jwtpayload
    //expira en una hora la sesion 
    //da una respuesta en setheader y crea un nuevo token 
    const { id_usuario, Id_rol, id_negocio } = jwtPayload;
    const newToken = jwt.sign({ id_usuario, Id_rol, id_negocio }, config_1.default.jwtSecret, { expiresIn: '1h' });
    res.setHeader('token', newToken);
    next();
};
exports.chekjwt = chekjwt;
