import { Router } from 'express';
import {  usercontroller } from '../controllers/User.controller';
import { chekjwt } from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';


//get metodo de enlistar
//post crear
//put metodo de editar
 class UserRouter{
     public router: Router=Router();
     constructor(){
        this.config();
     } 
     config(): void{
        this.router.get('/rol',[chekjwt, checkrole([2,3])],usercontroller.listRol);
        this.router.get('/rol/:id',[chekjwt, checkrole([2,3])],usercontroller.getRol);
        this.router.post('/rol',[chekjwt, checkrole([2,3])], usercontroller.createrol);
        this.router.put('/rol/:id',[chekjwt, checkrole([2,3])], usercontroller.editRol);
        this.router.delete('/rol/:id',[chekjwt, checkrole([2,3])], usercontroller.deleteRol);
        this.router.get('/user',[chekjwt, checkrole([2,3])],usercontroller.listUser);
        this.router.get('/user/:id',[chekjwt, checkrole([2,3])], usercontroller.getUser);
        this.router.post('/user',[chekjwt, checkrole([2,3])],usercontroller.createUser);
        this.router.put('/user/:id',[chekjwt, checkrole([2,3])], usercontroller.editUser);
        this.router.delete('/user/:id',[chekjwt, checkrole([2,3])], usercontroller.deleteUser);
        this.router.get('/auth',[chekjwt, checkrole([2,3])], usercontroller.listAuten);
        this.router.get('/auth/:id',[chekjwt, checkrole([2,3])], usercontroller.getAuten);
        this.router.post('/auth',[chekjwt, checkrole([2,3])], usercontroller.createAuten);
        this.router.put('/auth/:id',[chekjwt, checkrole([2,3])], usercontroller.editAuten);
        this.router.delete('/auth/:id',[chekjwt, checkrole([2,3])], usercontroller.deleteAuten);
        this.router.put('/useruptate/:id',[chekjwt, checkrole([2,3])], usercontroller.updateUser);
        this.router.put('/userpassword/:id',[chekjwt, checkrole([2,3])], usercontroller.updatePassword);
     }
 }

 const userRouter = new UserRouter();
 export default userRouter.router;

