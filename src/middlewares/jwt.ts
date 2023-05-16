import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

//exportamos la clave de seguridad de la aplicacion, si esta logeado generara el token 
//luego genera la funcion - en el header 
export const chekjwt = (req: Request, res: Response, next: NextFunction)=>{
  const token = <string>req.headers['auth'];
  let jwtPayload;
  //controlador del token, genera la clave secreta con jwtsecret
  try
  {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    //para probar 

  }
  catch (e){
      //envia una pagina de error 
    return res.status(401).send();
  }
  //generar un token para jwtpayload
  //expira en una hora la sesion 
  //da una respuesta en setheader y crea un nuevo token 
  const { id_usuario, Id_rol, id_negocio  } = jwtPayload;
  const newToken = jwt.sign({ id_usuario, Id_rol,id_negocio}, config.jwtSecret, { expiresIn: '1h' });
  res.setHeader('token', newToken);
  next();
}