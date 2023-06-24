import { Request, Response } from 'express';
import pool from '../database';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import md5 from 'md5';
import { transporter } from '../config/mailer'; 
import {generateOTP} from '../config/otpgenerato';

//los controladores no necesitan inicializacion 
const savedOTPS: any = {};
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

    public async sendemail(req: Request, res: Response):Promise<void>{
      try{
        const { email } = req.body;
        await pool.query('SELECT * FROM usuario WHERE correo = ?',[email],(err, result)=>{
          if (err) throw err;
          if(result.length>0){
            const data = result[0];
            const otp = generateOTP();
            transporter.sendMail({
              from: '"Centro Comercial Popular 👻" <popularcentrocomercial@gmail.com>', // sender address
              to: data.correo, // list of receivers
              subject: "Código de Recuperación", // Subject line
              html: `
              <h1>Centro Comercial Popular</h1>
              <h3>hola!: ${ data.nombre }</h3>
              <br>
              <p>Código OTP de recuperacion de contraseña</p>
              <h1>${ otp } </h1>
              `, // html body
            });
            savedOTPS[email] = otp;
            setTimeout(
              () => {
                  delete savedOTPS[email]
                }, 300000
            );
            res.json({
              message: 'Message enviado corectamente',
            });
            return;
          }
          res.status(404).json({message: 'No hay ningun usuario con ese email'});
        });
      }
      catch(e){
        const emailStatus= e;
        res.status(404).json({ message:'something goes wrong!'})
      }
    }

  public async checkotp(req: Request, res: Response):Promise<void>{
    const { email, otp } = req.body;
    console.log(savedOTPS[email]);    if(savedOTPS[email] == otp ){
      await pool.query('SELECT * FROM usuario WHERE correo = ?',[email],(err, result)=>{
        if (err) throw err;
        if(result.length>0){
          const data = result[0];
          const id = jwt.sign({
            idusuario: data.idusuario
          },config.jwtSecret, {expiresIn: '5m'}
          );
          res.json({
            message: 'ok',
            token: id
          })
        }
      });
      return;
    }
    res.status(404).json({message: 'error'});
  }

  public async resetPasword(req: Request, res: Response):Promise<void>{
    const {id}= req.params;
    const {password , password2 } = req.body;
    try{
      const idcode:any = <any>jwt.verify(id, config.jwtSecret);
      console.log( idcode);
      if (!(password && password2)){
        res.status(404).json({message: 'campos requeridos requerido'}); 
        return;
      }
  
      if(!(password === password2)){
        res.status(404).json({message: 'Contraseña No son iguales'}); 
      }
      let pass
      if(password){
        pass = md5(password);
      }
  
      await pool.query('UPDATE usuario SET password = ? WHERE Estado = 1 AND idusuario = ?',[ pass,idcode.idusuario ],(err, result)=>{
        if (err) throw err;
        console.log(result);
        if(result){
          res.json({message: 'contraseñas actualizadas'});
          return;
        }
        res.status(404).json({message: 'erro al canbiar la contraseña'});
      });
    }
    catch(err){
      res.status(404).json(err);
    }
  }
}


export const authcontroller = new AuthController;