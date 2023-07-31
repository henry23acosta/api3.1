import { Router } from "express";
import { mediaController } from "../controllers/media.controler";
import { chekjwt } from "../middlewares/jwt";
import { checkrole } from "../middlewares/roles";

class MediaRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config(): void {
        this.router.post('/upload', mediaController.Upload);
        this.router.get('/imagebase64/:id/', mediaController.ImageBase64);
    }
}

const mediaRouter = new MediaRouter();
export default mediaRouter.router;