"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Productos_Controller_1 = require("../controllers/Productos.Controller");
const jwt_1 = require("../middlewares/jwt");
const roles_1 = require("../middlewares/roles");
class ProductosRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/productoslist/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getProducto);
        this.router.get('/productos/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getidProducto);
        this.router.get('/productoscateg/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getProductoCateg);
        this.router.post('/productos', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.createProducto);
        this.router.put('/productos/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.updateProducto);
        this.router.delete('/productos/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.deleteProducto);
        this.router.get('/imagencat/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getidimagen);
        this.router.post('/imagen', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.createimagen);
        this.router.put('/imagen/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.updateimagen);
        this.router.delete('/imagen/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.deleteimagen);
        this.router.delete('/deletecomplete/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.deleteimagentotAL);
        this.router.get('/categoriaslist/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getCategoria);
        this.router.get('/categorias/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getidCategoria);
        this.router.post('/categorias', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.createCategoria);
        this.router.put('/categorias/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.updateCategoria);
        this.router.delete('/categorias/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.deleteCategoria);
        this.router.post('/compra', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.addcomprarproductotmp);
        this.router.post('/newcompra', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.generarcompra);
        this.router.get('/compraview/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getcompra);
        this.router.get('/compraid/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getIdcompra);
        this.router.get('/compraviewdetall/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.getIddetallecompra);
        this.router.get('/compratemp/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.ListCompra);
        this.router.delete('/compratmp/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.deletecompratmp);
        this.router.delete('/compratmpid/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Productos_Controller_1.productoController.deleteidcompratmp);
    }
}
const productosRouter = new ProductosRouter();
exports.default = productosRouter.router;
