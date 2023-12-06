import { Request, Response } from 'express';
import pool from '../database';

class NegocioController {

    //NEGOCIO
    public async getNegocio(req: Request, res: Response):Promise<void>{
        await pool.query('SELECT * FROM negocio', (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Negocios no Encontrados'});
          });
    }

    public async getIdNegocio(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM negocio WHERE id_negocio = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Negocio no Existe'});
        });
    }

    public async createNegocio(req: Request, res: Response):Promise<void>{
        const { nombre,ruc,direccion,telefono,correo } = req.body;
        if(!(nombre && ruc && direccion && telefono && correo)){
            res.status(404).json({message: 'campos requeridos'});
        }else{
            await pool.query('INSERT INTO negocio(nombre,ruc,direccion,telefono,correo)VALUES(?,?,?,?,?)', 
            [ nombre,ruc,direccion,telefono,correo ], (err, result) => {
              if(err) throw err;
              res.json({text: 'Negocio Creado'});
            });
        }
        }
        

    public async updateNegocio(req: Request, res: Response): Promise<void> {
        const { nombre, ruc, direccion, telefono, correo } = req.body;
        const fecha_update = new Date();
        const { id } = req.params;
        await pool.query('UPDATE negocio SET nombre = ?, ruc = ?, direccion = ?, telefono = ?, correo = ?, fecha_update =? WHERE id_negocio = ?',
        [nombre,ruc,direccion,telefono,correo,fecha_update,id],(err, result) => {
          if(err) throw err;
          res.json({text: 'Negocio Actualizado'});
        });
    }
    public async deleteNegocio(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        if (!(id)){
            res.status(404).json({ message: 'Campos Requeridos' });
        }
        await pool.query('DELETE FROM negocio WHERE id_negocio= ?;', [id], (err, result) => {
            if (err) throw err;
            res.json({ text: 'Negocio eliminado' });
        });
    }

}

export const negociocontroller = new NegocioController;