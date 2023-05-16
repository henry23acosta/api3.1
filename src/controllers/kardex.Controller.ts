import { Request, Response } from 'express';
import pool from '../database';

class KardexController {

    //KARDEX
    public async getkardex(req: Request, res: Response):Promise<void>{
        await pool.query('SELECT * FROM kardex', (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Kardex no Encontrados'});
          });
    }

    public async getIdkardex(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM kardex WHERE idkardex = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Kardex no Existe'});
        });
    }


 //Buscar por idProducto dentro del kardex 
    public async getIdkardexProd(req: Request, res: Response):Promise<void>{
        const { idkarProd } = req.params;
        console.log(req.params);
        await pool.query('SELECT * FROM kardex WHERE idProductos = ?', [ idkarProd ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Id Producto dentro del Kardex no Existe'});
        });
    }





    public async createKardex(req: Request, res: Response):Promise<void>{
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
        

    public async deleteKardex(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        if (!(id)){
            res.status(404).json({ message: 'Campos Requeridos' });
        }
        await pool.query('DELETE FROM kardex WHERE idkardex= ?;', [id], (err, result) => {
            if (err) throw err;
            res.json({ text: 'Registro del kardex eliminado' });
        });
    }

}

export const kardexcontroller = new KardexController;