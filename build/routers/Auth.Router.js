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
        this.router.post('/sendemail/', Auth_Controller_1.authcontroller.sendemail);
        this.router.post('/checkotp/', Auth_Controller_1.authcontroller.checkotp);
        this.router.post('/restpassword/:id/', Auth_Controller_1.authcontroller.resetPasword);
    }
}
const authRouter = new AuthRouter();
exports.default = authRouter.router;
