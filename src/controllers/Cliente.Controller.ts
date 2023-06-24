import { Request, Response } from 'express';
import pool from '../database';

class ClienteController {

    //NEGOCIO
    public async getCliente(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM cliente WHERE estado = 1 AND id_negocio=?', [ id ],(err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Clientes no Encontrados'});
          });
    }

    public async getCiCliente(req: Request, res: Response):Promise<void>{
        const { cl, idnegocio } = req.params;
        await pool.query('SELECT * FROM cliente WHERE identificacion = ?  AND id_negocio = ?', [ cl, idnegocio ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Cliente no Existe'});
        });
    }

    public async getIdCliente(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM cliente WHERE idCliente = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Cliente no Existe'});
        });
    }

    public async createCliente(req: Request, res: Response):Promise<void>{
        const { nombre,identificacion,direccion,telefono,correo,id_negocio } = req.body;
        if(!(nombre && identificacion && direccion && telefono && correo && id_negocio)){
            res.status(404).json({message: 'campos requeridos'});
        }else{
            await pool.query('INSERT INTO cliente(nombre,identificacion,direccion,telefono,correo,id_negocio)VALUES(?,?,?,?,?,?)', 
        [nombre,identificacion,direccion,telefono,correo,id_negocio], (err, result) => {
          if(err) throw err;
          res.json({text: 'cliente Creado'});
        });
        }   
    }
    
       public async editCompra(req: Request, res: Response): Promise<void> {
        const { nombre,identificacion,direccion,telefono,correo} = req.body;
        const { id } = req.params;
        await pool.query('UPDATE cliente SET nombre=?,identificacion=?,direccion=?,telefono=?,correo =? WHERE idProveedores = ?',
        [nombre,identificacion,direccion,telefono,correo],(err, result) => {
          if(err) throw err;
          res.json({text: 'Cliente Actualizado'});
        });
    }

    public async updateCliente(req: Request, res: Response): Promise<void> {
        const { nombre,identificacion,direccion,telefono,correo} = req.body;
        const { id } = req.params;
        await pool.query('UPDATE cliente SET nombre = ?, identificacion = ?, direccion = ?, telefono = ?, correo = ? WHERE idCliente = ?',
        [nombre,identificacion,direccion,telefono,correo,id],(err, result) => {
          if(err) throw err;
          res.json({text: 'Cliente Actualizado'});
        });
    }
    public async deleteCliente(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        console.log(req.params);
        if (!(id)){
            res.status(404).json({ message: 'Campos Requeridos' });
        }
        await pool.query('UPDATE cliente  SET estado = 0 WHERE idCliente = ?;', [id], (err, result) => {
            if (err) throw err;
            res.json({ text: 'Cliente eliminado' });
        });
    }
}

export const clienteController = new ClienteController;