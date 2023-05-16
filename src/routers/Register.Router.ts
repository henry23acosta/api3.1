import {Router} from 'express';
import { registerController } from '../controllers/Register.Controller';
import { productoController } from '../controllers/Productos.Controller';
import { proveedoresController } from '../controllers/Proveedor.Controller';

class RouterRegirter{
    public router: Router=Router();
    constructor() {
        this.config();
    }
    config(): void{
        this.router.post('/registar', registerController.createUser);
        this.router.get('/google', registerController.GoogleAuth);
        this.router.post('/google/callback', registerController.googlecallback);
        this.router.get('/category/:id', productoController.getCategoria);
        this.router.post('/registarcategory', productoController.createCategoria);
        this.router.post('/registarpovider', proveedoresController.createProveedores );
        this.router.post('/registarprod', productoController.createProducto );
    }
}

const routerregirter = new RouterRegirter();
export default routerregirter.router;
