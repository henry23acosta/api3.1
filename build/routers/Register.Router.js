"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Register_Controller_1 = require("../controllers/Register.Controller");
const Productos_Controller_1 = require("../controllers/Productos.Controller");
const Proveedor_Controller_1 = require("../controllers/Proveedor.Controller");
class RouterRegirter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/registar', Register_Controller_1.registerController.createUser);
        this.router.get('/check', Register_Controller_1.registerController.checklogin);
        this.router.get('/google', Register_Controller_1.registerController.GoogleAuth);
        this.router.post('/google/callback', Register_Controller_1.registerController.googlecallback);
        this.router.get('/category/:id', Productos_Controller_1.productoController.getCategoria);
        this.router.post('/registarcategory', Productos_Controller_1.productoController.createCategoria);
        this.router.post('/registarpovider', Proveedor_Controller_1.proveedoresController.createProveedores);
        this.router.post('/registarprod', Productos_Controller_1.productoController.createProducto);
    }
}
const routerregirter = new RouterRegirter();
exports.default = routerregirter.router;
