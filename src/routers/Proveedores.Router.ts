import {Router} from 'express';
import { proveedoresController } from '../controllers/Proveedor.Controller';
import {chekjwt} from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';

class ProveedorRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config(): void {
        this.router.get('/proveedoreslist/:id',[chekjwt, checkrole([2,3])], proveedoresController.getProveedores);
        this.router.get('/proveedores/:id',[chekjwt, checkrole([2,3])], proveedoresController.getIdProveedores);
        this.router.post('/proveedores',[chekjwt, checkrole([2,3])],  proveedoresController.createProveedores);
        this.router.put('/proveedores/:id',[chekjwt, checkrole([2,3])],  proveedoresController.updateProveedores);
        this.router.delete('/proveedores/:id',[chekjwt, checkrole([2,3])],  proveedoresController.deleteProveedores);
    }
}

const proveedorRouter = new ProveedorRouter();
export default proveedorRouter.router;

