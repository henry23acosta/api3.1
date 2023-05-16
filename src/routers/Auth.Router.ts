import {Router} from 'express';
import {authcontroller} from '../controllers/Auth.Controller';

//get metodo de enlistar
//post crear
//put metodo de editar
 class AuthRouter{ 
     public router: Router=Router();
     constructor(){
         this.config();
     } 
     config(): void{ 
         this.router.post('/', authcontroller.login); 
     }
 }

 const authRouter = new AuthRouter();
 export default authRouter.router;