import { Request, Response } from 'express';
import pool from '../database';

class CheckInController {
  //FACTURA
  public async getfacturas(req: Request, res: Response):Promise<void>{
    const { id } = req.params;
    await pool.query('SELECT * FROM viewVentas where id_negocio=?',[id], (err, result) => {
        if(err) throw err;
        if(result.length){
            return res.json(result)
        }
        res.status(404).json({text: 'Facturas no Encontrados'});
      });
}

public async getIdfacturas(req: Request, res: Response):Promise<void>{
    const { id } = req.params;
    await pool.query('SELECT * FROM factura WHERE idFactura = ?', [ id ], (err, result) => {
        if(err) throw err;
        if(result.length){
            return res.json(result)
        }
        res.status(404).json({text: 'Proveedor no Existe'});
    });
}

public async getIddetallefacturas(req: Request, res: Response):Promise<void>{
  const { id } = req.params;
  await pool.query('select * from viewdetallefac where idFactura = ?', [ id ], (err, result) => {
      if(err) throw err;
      if(result.length){
          return res.json(result)
      }
      res.status(404).json({text: 'Detalles de Factura no Existe'});
  });
}



    
    //detalleFactura
    public async ListCheckin(req: Request, res: Response): Promise<void>{
      const { id } = req.params;
      await pool.query('SELECT * FROM viewfactura WHERE idusuario = ?',[id], (err, result) => {
          if(err) throw err;
          if(result.length){
            return res.json(result)
          }
          res.json({text: 'facturas no Encontrados'});
        });
  }

    public async addproductofacturatmp(req: Request, res: Response): Promise<void>{
        const { producto, cantidad, usuario, valorfinal } = req.body;
        console.log(req.body);
        if (!( producto && cantidad && usuario && valorfinal )){
            res.status(404).json({message: 'Campos Requeridos'});
        }
        await pool.query('call disminuirproducto(?, ?, ?, ?)',
        [ producto, cantidad,usuario, valorfinal ], (err, result) => {
          if(err) throw err;
          res.json({text: 'producto agregado'});
        });
    }

    public async dissproductofacturatmp( req: Request, res: Response ): Promise<void>{
      const { id } = req.params;
      if (!( id )){
          res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('call aumentarproductos(?);',
      [ id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'producto Eliminado'});
      });
    }

    public async generarfactura( req: Request, res: Response ): Promise<void>{
      const { idusuario, idcliente, idnegocio } = req.body;
      if (!( idusuario && idcliente && idnegocio )){
          res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('call detalle_fac(?, ?, ?)',
      [ idusuario, idcliente, idnegocio ], (err, result) => {
        if(err) throw err;
        res.json({text: 'factura creada'});
      });
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
        }
        await pool.query('DELETE FROM factura_detalle_temp WHERE idfactura_detalle_temp = ?', [ id ], (err, result) => {
            if(err) throw err;
            res.json({text: 'factura eliminado'});
        });
    }

    public async dropdetafactemp(req: Request, res: Response): Promise<void>{
      const { id } = req.params;
      console.log(req.params);
      if (!(id)){
      res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('Delete from factura_detalle_temp where idusuario= ?', [ id ], (err, result) => {
          if(err) throw err;
          res.json({text: 'factura temporal eliminada'});
      });
  }



}

export const checkInController = new CheckInController;