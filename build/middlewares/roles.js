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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkrole = void 0;
//libreria para controlar las respuestas o response
const checkrole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { Id_rol } = res.locals.jwtPayload;
        //igualo el idroles 
        if (roles.includes(Id_rol)) {
            next();
        }
        else {
            return res.status(401).json({ message: 'no Auterizate' });
        }
    });
};
exports.checkrole = checkrole;
