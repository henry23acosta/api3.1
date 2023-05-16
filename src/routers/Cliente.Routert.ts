import {Router} from 'express';
import { clienteController } from '../controllers/Cliente.Controller';
import {chekjwt} from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';

class ClienteRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config(): void {
        this.router.get('/clienteslist/:id',[chekjwt, checkrole([2,3])],clienteController.getCliente);
        this.router.get('/clientes/:id',[chekjwt, checkrole([2,3])],clienteController.getIdCliente);
        this.router.post('/clientes',[chekjwt, checkrole([2,3])], clienteController.createCliente);
        this.router.put('/clientes/:id',[chekjwt, checkrole([2,3])], clienteController.updateCliente);
        this.router.delete('/clientes/:id',[chekjwt, checkrole([2,3])], clienteController.deleteCliente);
        this.router.get('/cl/:cl',[chekjwt, checkrole([2,3])], clienteController.getCiCliente);
    }
}

const clienteRouter = new ClienteRouter();
export default clienteRouter.router;