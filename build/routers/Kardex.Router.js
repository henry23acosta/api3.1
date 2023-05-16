"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kardex_Controller_1 = require("../controllers/kardex.Controller");
const jwt_1 = require("../middlewares/jwt");
const roles_1 = require("../middlewares/roles");
class KardexRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config() {
        this.router.get('/kardexs', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], kardex_Controller_1.kardexcontroller.getkardex);
        this.router.get('/kardexs/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], kardex_Controller_1.kardexcontroller.getIdkardex);
        this.router.get('/producto/:idkarProd', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], kardex_Controller_1.kardexcontroller.getIdkardexProd);
        this.router.post('/kardexs', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], kardex_Controller_1.kardexcontroller.createKardex);
        this.router.delete('/kardexs/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], kardex_Controller_1.kardexcontroller.deleteKardex);
        this.router.get('/cl/:cl', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], kardex_Controller_1.kardexcontroller.getkardex);
    }
}
const kardexRouter = new KardexRouter();
exports.default = kardexRouter.router;
