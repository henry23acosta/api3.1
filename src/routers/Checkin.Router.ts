import {Router} from 'express';
import { checkInController } from '../controllers/Checkin.Controller';
import { chekjwt } from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';

class  CheckinRouter{
    public router: Router=Router();
    constructor(){
        this.config();
    } 
    config(): void{ 
        this.router.get('/viewfact/:id',[chekjwt, checkrole([2,3])], checkInController.getfacturas );
        this.router.get('/viewid/:id',[chekjwt, checkrole([2,3])], checkInController.getIdfacturas );
        this.router.get('/view/:id',[chekjwt, checkrole([2,3])], checkInController.ListCheckin );
        this.router.get('/detallefactura/:id',[chekjwt, checkrole([2,3])], checkInController.getIddetallefacturas );
        this.router.post('/',[chekjwt, checkrole([2,3])], checkInController.addproductofacturatmp); 
        this.router.delete('/:id',[chekjwt, checkrole([2,3])], checkInController.dissproductofacturatmp); 
        this.router.post('/generar',[chekjwt, checkrole([2,3])], checkInController.generarfactura); 
        this.router.delete('/tmp/:id',[chekjwt, checkrole([2,3])], checkInController.dropdetafactemp); 


    } 
}

const checkinRouter = new CheckinRouter();
export default checkinRouter.router;