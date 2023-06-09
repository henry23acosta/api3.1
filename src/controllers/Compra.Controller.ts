import { Request, Response } from 'express';
import pool from '../database';

class CompraController {

    public async getIdcompras(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM compra WHERE idcompra = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Proveedor no Existe'});
        });
    }
    
    public async getIddetallecompras(req: Request, res: Response):Promise<void>{
      const { id } = req.params;
      await pool.query('select * from viewdetallecompra where idcompra = ?', [ id ], (err, result) => {
          if(err) throw err;
          if(result.length){
              return res.json(result)
          }
          res.status(404).json({text: 'Detalles de Factura no Existe'});
      });
    }
    //Compras
    public async getcompra(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM viewcompraspro where id_negocio=?',[id], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Compras no Encontras'});
          });
    }


    public async addprimeraCompra(req: Request, res: Response):Promise<void>{
        const { nomb,costop, tall,imag, stocprod, idCat} = req.body;
        if(!(nomb && costop && tall && imag && stocprod && idCat)){
            res.status(404).json({message: 'campos requeridos'});
        }else{
            await pool.query('call generainventarioinicial(?, ?, ?, ?, ?, ?)',
             [nomb,costop, tall,imag, stocprod, idCat], (err, result) => {
              if(err) throw err;
              res.json({text: ' Compra Creada'});
            });
        }
           
    }

    public async addCompra(req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        const { detallcmpra,sstockcompra,costproduct} = req.body;
        if (!( detallcmpra && sstockcompra && costproduct )){
            res.status(404).json({message: 'Campos Requeridos'});
        }
        await pool.query('call generarcompra(?, ?, ?, ?)',
        [id,detallcmpra,sstockcompra,costproduct],(err, result) => {
          if(err) throw err;
          res.json({text: 'Compra Actualizado'});
        });
    }
    public async deleteCompra(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        if (!(id)){
            res.status(404).json({ message: 'Campos Requeridos' });
        }
        await pool.query('DELETE FROM compra WHERE idcompra = ?;', [id], (err, result) => {
            if (err) throw err;
            res.json({ text: 'Compra eliminado' });
        });
    }

}

export const compraController = new CompraController;