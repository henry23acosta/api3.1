"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Checkin_Controller_1 = require("../controllers/Checkin.Controller");
const jwt_1 = require("../middlewares/jwt");
const roles_1 = require("../middlewares/roles");
class CheckinRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/viewfact/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Checkin_Controller_1.checkInController.getfacturas);
        this.router.get('/viewid/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Checkin_Controller_1.checkInController.getIdfacturas);
        this.router.get('/view/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Checkin_Controller_1.checkInController.ListCheckin);
        this.router.get('/detallefactura/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Checkin_Controller_1.checkInController.getIddetallefacturas);
        this.router.post('/', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Checkin_Controller_1.checkInController.addproductofacturatmp);
        this.router.delete('/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Checkin_Controller_1.checkInController.dissproductofacturatmp);
        this.router.post('/generar', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Checkin_Controller_1.checkInController.generarfactura);
        this.router.delete('/tmp/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], Checkin_Controller_1.checkInController.dropdetafactemp);
    }
}
const checkinRouter = new CheckinRouter();
exports.default = checkinRouter.router;
