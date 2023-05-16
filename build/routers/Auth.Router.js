"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_Controller_1 = require("../controllers/Auth.Controller");
//get metodo de enlistar
//post crear
//put metodo de editar
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', Auth_Controller_1.authcontroller.login);
    }
}
const authRouter = new AuthRouter();
exports.default = authRouter.router;
