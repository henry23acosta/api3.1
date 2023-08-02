import { Request, Response } from 'express';
import pool from '../database';
import pool1 from '../database1';
import { RowDataPacket, OkPacket } from 'mysql2';


const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

class ProductoController {
    //Producto
    //get
    
    public async getProducto(req: Request, res: Response):Promise<void> {
      const { id } = req.params;
      try{
        const p = pool1.promise();
        const [rows,fields] = await p.query('SELECT * FROM listproductos WHERE id_negocio = ?',[id]);
        const rows1: any = rows;
        const res1: any[] = [];
        for(let item of rows1){
          const result = await p.query('SELECT * FROM productos_has_imagen WHERE idProductos = ?', [item.idProductos]);
          const result1: any = result;
          const img: any[] = [];
          for (const i of result1[0]) {
            console.log(i);
            const result2 = await p.query('SELECT * FROM imagen WHERE idimagen = ?', [i.idimagen]);
            const r:any = result2[0];
            img.push(
              {
                idimagen: result1[0].idimagen,
                //urlimg: `http://localhost:3000${r[0].urlimg}`
                urlimg: `https://www.appopular.me${r[0].urlimg}`
              }
            );
          }
          res1.push({
            idProductos: item.idProductos,
            nombre: item.nombre,
            costo: item.costo,
            talla: item.talla,
            stock: item.stock,
            estado: item.estado,
            images: img,
            categoria: item.categoria,
            id_negocio: item.id_negocio,
          });
        }
        res.json(res1);
      }
      
      catch(e: any){
        res.status(404).json({text: e.message});
      }
    }




    public async getProductoCateg(req: Request, res: Response):Promise<void> {
      try{
        const { id } = req.params;
        const p = pool1.promise();
        const [rows,fields] = await p.query('SELECT * FROM productos WHERE idCategoria = ?',[ id ]);
        res.json(rows);
      }
      catch(e:any){
        res.status(404).json({text: e.message});
      }
  }

    //getidIMAGEN
    public async getidimagen(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
        await pool.query('SELECT* FROM imagen WHERE idimagen = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
        res.status(404).json({text: 'Imagen no existe'});
      });
    }    

    public async createimagen(req: Request, res: Response):Promise<void> {
        const { idproducto,url } = req.body;
        console.log(req.body);

        if(!(idproducto && url)){
          res.status(404).json({message: 'Campos Requeridos'});
        }
        await pool.query('call crearimagen (?,?);',[ idproducto,url],(err, result) =>{
          if(err) throw err;
          res.json({text: 'Imagen Creada'});
        });
    }

    //update
    public async updateimagen(req: Request, res: Response):Promise<void> {
        const { urlimg  } = req.body;
        const { id } = req.params;
        if (!(urlimg && id)){
          res.status(404).json({message: 'Campos Requeridos'});
        }else{
          await pool.query('UPDATE productos SET urlimg = ? WHERE idimagen = ?;',
          [ urlimg, id ], (err, result) => {
           if(err) throw err;
           res.json({text: 'Imagen editado'});
         });
        }
    }
    //delete
    public async deleteimagen(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
      if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('DELETE FROM imagen WHERE idimagen = ?', [ id ], (err, result) => {
        if(err) throw err;
        res.json({ message: 'imagen eliminado'});
      });
    }




 public async deleteimagentotAL(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: 'Campos Requeridos' });
    return;
  }

  // Primero, obtenemos la información de la imagen para obtener su ruta en el sistema de archivos
  await pool.query('SELECT urlimg FROM imagen WHERE idimagen = ?', [id], async (err, result) => {
    if (err) {
      throw err;
    }
    

    if (result.length === 0) {
      // Si no se encuentra la imagen en la base de datos, respondemos con un 404
      res.status(404).json({ message: 'Imagen no encontrada' });
    } else {
      const rutaImagen = result[0].urlimg;

      // Eliminamos la imagen de la base de datos
      await pool.query('DELETE FROM imagen WHERE idimagen = ?', [id], async (err, _) => {
        if (err) {
          throw err;
        }

        try {
          // Eliminamos el archivo de la carpeta media utilizando fs.unlink
          await unlinkAsync(`./${rutaImagen}`);

          // Si se elimina correctamente, respondemos con un mensaje de éxito
          res.json({ message: 'Imagen eliminada' });
        } catch (unlinkError) {
          // Si ocurre un error al eliminar el archivo, respondemos con un 500
          res.status(500).json({ message: 'Error al eliminar el archivo de la carpeta media' });
        }
      });
    }
  });
}

    





    //getid
    public async getidProducto(req: Request, res: Response):Promise<void> {
      try{
        const { id } = req.params;
        const p = pool1.promise();
        const [rows,fields] = await p.query('SELECT * FROM productos WHERE idProductos = ?',[ id ]);
        const rows1: any = rows;
        const result = await p.query('SELECT * FROM productos_has_imagen WHERE idProductos = ?', [id]);
        const result1: any = result;
        const img: any[] = [];
        for (const i of result1[0]) {
          const result2 = await p.query('SELECT * FROM imagen WHERE idimagen = ?', [i.idimagen]);
          const result3: any = result2;
          img.push(
            {
              idimagen: result3[0][0].idimagen,
              //urlimg: `http://localhost:3000${result3[0][0].urlimg}`
              urlimg: `https://www.appopular.me${result3[0][0].urlimg}`
            }
          );
        }
        res.json({
            idProductos: rows1[0].idProductos,
            nombre: rows1[0].nombre,
            costo: rows1[0].costo,
            talla: rows1[0].talla,
            stock: rows1[0].stock,
            estado: rows1[0].estado,
            images: img,
            idCategoria: rows1[0].idCategoria,
            id_negocio: rows1[0].id_negocio
        });
      }
      catch(e:any){
        res.status(404).json({text: e.message});
      }
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