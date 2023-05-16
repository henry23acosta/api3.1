import { Request, Response, NextFunction } from 'express';
import pool from '../database';
//libreria para controlar las rspuestas o response

export const checkrole = (roles: Array<number>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { Id_rol } = res.locals.jwtPayload;
    //igualo el idroles 
    if (roles.includes(Id_rol)) {
      next();
    } else {
      return res.status(401).json({ message: 'no Auterizate' });
    }

  };
};