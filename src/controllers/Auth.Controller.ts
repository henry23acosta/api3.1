import { Request, Response } from 'express';
import pool from '../database';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import md5 from 'md5';
//los controladores no necesitan inicializacion 
class AuthController {
    public async login(req: Request, res: Response):Promise<void> {
   //para recoger las variables de la aplicacion
        const { user, password }= req.body;
        //si NO hay algo en estos valores de una respuesta
        if (!(user && password)){
            res.status(404).json({message: 'Usuario y Contraseña es requerido'}); 
            return;
        }
        //signos de ? aperson sirven para dar valor 

        let pass
        if(password){
          pass = md5(password);
        }
        
        await pool.query('select * from login where user = ? and password = ?', [user, pass], (err, result) => {
          if (err) throw err;
          //SI HAY EL CAMPO PONGA EL OK 
          if (result.length){
              const token= jwt.sign({idusuario: result[0].idusuario,
                Id_rol: result[0].Id_rol, id_negocio: result[0].id_negocio}, config.jwtSecret,{expiresIn: '24h'});

              return res.json({message: 'OK', token,idusuario: result[0].idusuario, Id_rol: result[0].Id_rol,id_negocio: result[0].id_negocio})
          }
          res.status(404).json({text: 'Usuario no existe'});
        });
    }
}


export const authcontroller = new AuthController;