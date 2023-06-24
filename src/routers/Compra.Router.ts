import { Router } from 'express';
import { compraController } from '../controllers/Compra.Controller';
import { chekjwt } from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';

//get metodo de enlistar
//post crear
//put metodo de editar
 class CompraRouter{
     public compra: Router=Router();
     constructor(){
        this.config();
     } 
     config(): void{
        this.compra.get('/comprafact/:id',[chekjwt, checkrole([2,3])], compraController.getcompra );
        this.compra.get('/compraid/:id',[chekjwt, checkrole([2,3])], compraController.getIdcompras );
        this.compra.get('/compradetalle/:id',[chekjwt, checkrole([2,3])], compraController.getIddetallecompras );
        this.compra.post('/compras',[chekjwt, checkrole([2,3])], compraController.addprimeraCompra);
        this.compra.put('/compras/:id',[chekjwt, checkrole([2,3])], compraController.addCompra);
        this.compra.delete('/compras/:id',[chekjwt, checkrole([2,3])], compraController.deleteCompra);
     }
 }

 const compraRouter = new CompraRouter();
 export default compraRouter.compra;

