import {Router} from 'express';
import { kardexcontroller } from '../controllers/kardex.Controller';
import {chekjwt} from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';

class KardexRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config(): void {
        this.router.get('/kardexs',[chekjwt, checkrole([2,3])],kardexcontroller.getkardex);
        this.router.get('/kardexs/:id',[chekjwt, checkrole([2,3])],kardexcontroller.getIdkardex);
        this.router.get('/producto/:idkarProd',[chekjwt, checkrole([2,3])],kardexcontroller.getIdkardexProd);
        this.router.post('/kardexs',[chekjwt, checkrole([2,3])], kardexcontroller.createKardex);
        this.router.delete('/kardexs/:id',[chekjwt, checkrole([2,3])], kardexcontroller.deleteKardex);
        this.router.get('/cl/:cl',[chekjwt, checkrole([2,3])], kardexcontroller.getkardex);
    }
}

const kardexRouter = new KardexRouter();
export default kardexRouter.router;