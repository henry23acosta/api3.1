import { Request, Response } from 'express';
import pool from '../database';

class ProductoController {
    //Producto
    //get
    public async getProducto(req: Request, res: Response):Promise<void> {
      const { id } = req.params;
      await pool.query(`SELECT p.idProductos, p.nombre, p.costo, p.talla,`
      +` p.imagen, p.stock, p.estado,CONCAT(c.Nombre,'( ', c.Descripcion,' )') `+
      ` as categoria, p.id_negocio FROM productos p INNER JOIN categoria c WHERE `+
      `p.idCategoria = c.idCategoria AND p.estado = 1 AND p.id_negocio = ?`,[id], (err, result) => {
        if(err) throw err;
        if(result.length){
          return res.json(result)
        }
        res.status(404).json({text: 'Productos no Encontrados'});
      });
    }

    public async getProductoCateg(req: Request, res: Response):Promise<void> {
      const { id } = req.params;
      await pool.query('SELECT * FROM productos WHERE idCategoria = ?',[ id ], (err, result) => {
          if(err) throw err;
          if(result.length){
            return res.json(result)
          }
          res.json({text: 'Productos no Encontrados'});
        });
  }

    //getid
    public async getidProducto(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
        await pool.query('SELECT* FROM productos WHERE idProductos = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
        res.status(404).json({text: 'Rol no existe'});
      });
    }
    //create
    public async createProducto(req: Request, res: Response):Promise<void> {
        const { nombre, costo, talla, imagen, stock, idCategoria, id_negocio } = req.body;
        console.log(req.body);

        if(!(nombre && costo && talla && imagen && stock && idCategoria && id_negocio)){
          res.status(404).json({message: 'Campos Requeridos'});
          return;
        }

        await pool.query('call generainventarioinicial(?,?,?,?,?,?,?);',[nombre, costo, talla, imagen, stock, idCategoria, id_negocio],(err, result) =>{
          if(err) throw err;
          res.json({text: 'Categoria Creada'});
        });
       
    }
    //update
    public async updateProducto(req: Request, res: Response):Promise<void> {
        const { nombre, costo, talla, imagen, stock, idCategoria  } = req.body;
        const { id } = req.params;
  
        if (!(nombre && costo && talla && imagen && stock && idCategoria && id)){
          res.status(404).json({message: 'Campos Requeridos'});
        }else{
          await pool.query('UPDATE productos SET nombre = ?, costo = ?, talla = ?, imagen = ?, stock = ?, idCategoria = ? WHERE idProductos = ?;',
          [ nombre, costo, talla, imagen, stock, idCategoria, id ], (err, result) => {
           if(err) throw err;
           res.json({text: 'Producto editado'});
         });
        }
    }
    //delete
    public async deleteProducto(req: Request, res: Response):Promise<void> {
        const { id } = req.params;

      if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('UPDATE productos SET estado=0 WHERE idProductos = ?', [ id ], (err, result) => {
        if(err) throw err;
        res.json({ message: 'Producto eliminado'});
      });
    }
    //Categoria
    //get
    public async getCategoria(req: Request, res: Response):Promise<void> {
      const { id } = req.params;
      await pool.query('SELECT * FROM categoria WHERE estado = 1 AND id_negocio= ?',[id], (err, result) => {
        if(err) throw err;
        if(result.length){
          return res.json(result)
        }
        res.status(404).json({text: 'categoria no existe'});
      });
    }
    //getid
    public async getidCategoria(req: Request, res: Response):Promise<void> {
      const { id } = req.params;
        await pool.query('SELECT * FROM categoria where idCategoria = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
        res.status(404).json({text: 'categoria no existe'});
      });
    }
    //create
    public async createCategoria(req: Request, res: Response):Promise<void> {
      const { Nombre,Descripcion, id_negocio } = req.body;
      if (!(Nombre && Descripcion && id_negocio )){
          res.status(404).json({message: 'Campos Requeridos'});
        }else{
          await pool.query('INSERT INTO categoria(Nombre,Descripcion,id_negocio) VALUES(?,?,?);', [ Nombre, Descripcion, id_negocio ], (err, result) => {
            if(err) throw err;
            res.json({text: 'Categoria Creada'});
          });
        }
      
    }
    //update
    
    public async updateCategoria(req: Request, res: Response):Promise<void> {
      const { Nombre,Descripcion } = req.body;
      const { id } = req.params;
      if (!(Nombre && Descripcion && id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('UPDATE categoria SET Nombre = ?, Descripcion = ? WHERE idCategoria = ?;',
       [ Nombre,Descripcion, id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Categoria editada'});
      });
    }
    //delete
    public async deleteCategoria(req: Request, res: Response):Promise<void> {
      const { id } = req.params;

      if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('UPDATE categoria estado=0 WHERE idCategoria = ?;', [ id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Categoria eliminada{}'});
      });
    }


    //COMPRAS PRODUCTOS NUEVOS 
    public async addcomprarproductotmp(req: Request, res: Response): Promise<void>{
      const { idproducto, stock, iduser, compra, costo } = req.body;
      console.log(req.body);
      if (!( idproducto && stock && iduser && costo )){
          res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('call agregardetalletmpcompra(?, ?, ?, ?)',
      [ idproducto, stock, iduser, costo ], (err, result) => {
        if(err) throw err;
        res.json({text: 'producto agregado'});
      });
  }

//GENERAR COMPRA FINAL
  public async generarcompra( req: Request, res: Response ): Promise<void>{
    const { idusuario, idProveedores, num_fac, idnegocio } = req.body;
    console.log(req.body);
    if (!( idusuario && idProveedores && num_fac && idnegocio )){
        res.status(404).json({message: 'Campos Requeridos'});
    }
    await pool.query('call detalle_compra(?, ?, ?, ?)',
    [ idusuario, idProveedores, num_fac, idnegocio ], (err, result) => {
      if(err) throw err;
      res.json({text: 'Compra Nueva creada'});
    });
  }
  
  //vistas compra 
  //FACTURA
  public async getcompra(req: Request, res: Response):Promise<void>{
    const { id } = req.params;
    await pool.query('SELECT * FROM viewcompraspro where id_negocio=?',[id], (err, result) => {
        if(err) throw err;
        if(result.length){
            return res.json(result)
        }
        res.status(404).json({text: 'Compras no Encontrados'});
      });
}

public async getIdcompra(req: Request, res: Response):Promise<void>{
    const { id } = req.params;
    await pool.query('SELECT * FROM compra WHERE idcompra = ?', [ id ], (err, result) => {
        if(err) throw err;
        if(result.length){
            return res.json(result)
        }
        res.status(404).json({text: 'Compra no Existe'});
    });
}

public async getIddetallecompra(req: Request, res: Response):Promise<void>{
  const { id } = req.params;
  await pool.query('select * from viewdetallecompra where idcompra = ?', [ id ], (err, result) => {
      if(err) throw err;
      if(result.length){
          return res.json(result)
      }
      res.status(404).json({text: 'Detalles de Compra no Existe'});
  });
}

    //detallecompratemporal
    public async ListCompra(req: Request, res: Response): Promise<void>{
      const { id } = req.params;
      await pool.query('SELECT * FROM viewcompratemp WHERE idusuario = ?',[id], (err, result) => {
          if(err) throw err;
          if(result.length){
            return res.json(result)
          }
          res.json({text: 'Compras no Encontrados'});
        });
  }
  
  public async deletecompratmp(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    if (!(id)){
      res.status(404).json({message: 'Campos Requeridos'});
    }
    await pool.query('DELETE FROM compra_detalle_temporal WHERE idusuario = ?',[id],(err, result)=>{
      if(err) throw err;
      res.json({message: 'detalle elimnado'});
    });
  }

  public async deleteidcompratmp(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    if (!(id)){
      res.status(404).json({message: 'Campos Requeridos'});
    }
    await pool.query('DELETE FROM compra_detalle_temporal WHERE  idcompra_detalletemp = ?',[id],(err, result)=>{
      if(err) throw err;
      res.json({message: 'detalle elimnado'});
    });
  }

 }

export const productoController = new ProductoController;