"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cliente_Controller_1 = require("../controllers/Cliente.Controller");
const jwt_1 = require("../middlewares/jwt");
const roles_1 = require("../middlewares/roles");
class ClienteRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config() {
        this.router.get('/clienteslist/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Cliente_Controller_1.clienteController.getCliente);
        this.router.get('/clientes/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Cliente_Controller_1.clienteController.getIdCliente);
        this.router.post('/clientes', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Cliente_Controller_1.clienteController.createCliente);
        this.router.put('/clientes/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Cliente_Controller_1.clienteController.updateCliente);
        this.router.delete('/clientes/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Cliente_Controller_1.clienteController.deleteCliente);
        this.router.get('/cl/:cl', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Cliente_Controller_1.clienteController.getCiCliente);
    }
}
const clienteRouter = new ClienteRouter();
exports.default = clienteRouter.router;
