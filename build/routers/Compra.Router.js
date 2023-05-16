"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Compra_Controller_1 = require("../controllers/Compra.Controller");
const jwt_1 = require("../middlewares/jwt");
const roles_1 = require("../middlewares/roles");
//get metodo de enlistar
//post crear
//put metodo de editar
class CompraRouter {
    constructor() {
        this.compra = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.compra.get('/compras', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Compra_Controller_1.compraController.listCompra);
        this.compra.get('/compras/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Compra_Controller_1.compraController.getCompra);
        this.compra.post('/compras', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Compra_Controller_1.compraController.addprimeraCompra);
        this.compra.put('/compras/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Compra_Controller_1.compraController.addCompra);
        this.compra.delete('/compras/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Compra_Controller_1.compraController.deleteCompra);
    }
}
const compraRouter = new CompraRouter();
exports.default = compraRouter.compra;
