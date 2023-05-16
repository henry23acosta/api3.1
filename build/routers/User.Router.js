"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const jwt_1 = require("../middlewares/jwt");
const roles_1 = require("../middlewares/roles");
//get metodo de enlistar
//post crear
//put metodo de editar
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/rol', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.listRol);
        this.router.get('/rol/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.getRol);
        this.router.post('/rol', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.createrol);
        this.router.put('/rol/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.editRol);
        this.router.delete('/rol/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.deleteRol);
        this.router.get('/user', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.listUser);
        this.router.get('/user/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.getUser);
        this.router.post('/user', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.createUser);
        this.router.put('/user/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.editUser);
        this.router.delete('/user/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.deleteUser);
        this.router.get('/auth', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.listAuten);
        this.router.get('/auth/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.getAuten);
        this.router.post('/auth', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.createAuten);
        this.router.put('/auth/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.editAuten);
        this.router.delete('/auth/:id', [jwt_1.chekjwt, (0, roles_1.checkrole)([2, 3])], User_controller_1.usercontroller.deleteAuten);
        this.router.put('/useruptate/:id', User_controller_1.usercontroller.updateUser);
        this.router.put('/userpassword/:id', User_controller_1.usercontroller.updatePassword);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
