"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Proveedor_Controller_1 = require("../controllers/Proveedor.Controller");
const jwt_1 = require("../middlewares/jwt");
const roles_1 = require("../middlewares/roles");
class ProveedorRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config() {
        this.router.get('/proveedoreslist/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Proveedor_Controller_1.proveedoresController.getProveedores);
        this.router.get('/proveedores/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Proveedor_Controller_1.proveedoresController.getIdProveedores);
        this.router.post('/proveedores', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Proveedor_Controller_1.proveedoresController.createProveedores);
        this.router.put('/proveedores/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Proveedor_Controller_1.proveedoresController.updateProveedores);
        this.router.delete('/proveedores/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Proveedor_Controller_1.proveedoresController.deleteProveedores);
    }
}
const proveedorRouter = new ProveedorRouter();
exports.default = proveedorRouter.router;
