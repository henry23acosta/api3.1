import {Router} from 'express';
import { negociocontroller } from '../controllers/Negocio.Controller';
import {chekjwt} from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';

class NegocioRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config(): void {
        this.router.get('/negocios',[chekjwt, checkrole([2,3])],negociocontroller.getNegocio);
        this.router.get('/negocios/:id',[chekjwt, checkrole([2,3])],negociocontroller.getIdNegocio);
        this.router.post('/negocios',[chekjwt, checkrole([2,3])], negociocontroller.createNegocio);
        this.router.put('/negocios/:id',[chekjwt, checkrole([2,3])], negociocontroller.updateNegocio);
        this.router.delete('/negocios/:id',[chekjwt, checkrole([2,3])], negociocontroller.deleteNegocio);
    }
}

const negocioRouter = new NegocioRouter();
export default negocioRouter.router;
