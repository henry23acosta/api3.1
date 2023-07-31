"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const media_controler_1 = require("../controllers/media.controler");
class MediaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config() {
        this.router.post('/upload', media_controler_1.mediaController.Upload);
        this.router.get('/imagebase64/:id/', media_controler_1.mediaController.ImageBase64);
    }
}
const mediaRouter = new MediaRouter();
exports.default = mediaRouter.router;
