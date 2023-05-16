"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Negocio_Controller_1 = require("../controllers/Negocio.Controller");
const jwt_1 = require("../middlewares/jwt");
const roles_1 = require("../middlewares/roles");
class NegocioRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config() {
        this.router.get('/negocios', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Negocio_Controller_1.negociocontroller.getNegocio);
        this.router.get('/negocios/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Negocio_Controller_1.negociocontroller.getIdNegocio);
        this.router.post('/negocios', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Negocio_Controller_1.negociocontroller.createNegocio);
        this.router.put('/negocios/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Negocio_Controller_1.negociocontroller.updateNegocio);
        this.router.delete('/negocios/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Negocio_Controller_1.negociocontroller.deleteNegocio);
    }
}
const negocioRouter = new NegocioRouter();
exports.default = negocioRouter.router;
