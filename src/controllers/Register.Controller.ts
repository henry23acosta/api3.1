import { Request, Response } from 'express';
import pool from '../database';
import md5 from 'md5';
import passport from 'passport';
import '../config/config.passport'

class RegisterController {

  
  public async createUser(req: Request, res: Response):Promise<void> {
    const { nombre,usuario,password,telefono,correo,Estado } = req.body;
    let pass = md5(password);
      if (!(nombre && usuario && password && telefono && correo && Estado )){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('call crearusuarionuevo(?,?,?,?,?,?)', [ nombre,usuario,pass,telefono,correo,Estado ], (err, result) => {
        if(err) throw err;
        res.json({message: 'Usuario Creado', result: result[0]});
      });
    }

  public async GoogleAuth(req: Request, res: Response): Promise<void> {
    passport.authenticate('google', { scope: ['profile', 'email'] })
    res.send('hola');
  }

  public async googlecallback(req: Request, res: Response): Promise<void> {
     passport.authenticate('google');
     res.send('redict');

  }
}

 export const registerController = new RegisterController;
