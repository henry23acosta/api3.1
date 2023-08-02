"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoController = void 0;
const database_1 = __importDefault(require("../database"));
const database1_1 = __importDefault(require("../database1"));
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
class ProductoController {
    //Producto
    //get
    getProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const p = database1_1.default.promise();
                const [rows, fields] = yield p.query('SELECT * FROM listproductos WHERE id_negocio = ?', [id]);
                const rows1 = rows;
                const res1 = [];
                for (let item of rows1) {
                    const result = yield p.query('SELECT * FROM productos_has_imagen WHERE idProductos = ?', [item.idProductos]);
                    const result1 = result;
                    const img = [];
                    for (const i of result1[0]) {
                        console.log(i);
                        const result2 = yield p.query('SELECT * FROM imagen WHERE idimagen = ?', [i.idimagen]);
                        const r = result2[0];
                        img.push({
                            idimagen: result1[0].idimagen,
                            //urlimg: `http://localhost:3000${r[0].urlimg}`
                            urlimg: `https://www.appopular.me${r[0].urlimg}`
                        });
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
            catch (e) {
                res.status(404).json({ text: e.message });
            }
        });
    }
    getProductoCateg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const p = database1_1.default.promise();
                const [rows, fields] = yield p.query('SELECT * FROM productos WHERE idCategoria = ?', [id]);
                res.json(rows);
            }
            catch (e) {
                res.status(404).json({ text: e.message });
            }
        });
    }
    //getidIMAGEN
    getidimagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT* FROM imagen WHERE idimagen = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Imagen no existe' });
            });
        });
    }
    createimagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idproducto, url } = req.body;
            console.log(req.body);
            if (!(idproducto && url)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('call crearimagen (?,?);', [idproducto, url], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Imagen Creada' });
            });
        });
    }
    //update
    updateimagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { urlimg } = req.body;
            const { id } = req.params;
            if (!(urlimg && id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            else {
                yield database_1.default.query('UPDATE productos SET urlimg = ? WHERE idimagen = ?;', [urlimg, id], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'Imagen editado' });
                });
            }
        });
    }
    //delete
    deleteimagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM imagen WHERE idimagen = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ message: 'imagen eliminado' });
            });
        });
    }
    deleteimagentotAL(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                res.status(404).json({ message: 'Campos Requeridos' });
                return;
            }
            // Primero, obtenemos la información de la imagen para obtener su ruta en el sistema de archivos
            yield database_1.default.query('SELECT urlimg FROM imagen WHERE idimagen = ?', [id], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    throw err;
                }
                if (result.length === 0) {
                    // Si no se encuentra la imagen en la base de datos, respondemos con un 404
                    res.status(404).json({ message: 'Imagen no encontrada' });
                }
                else {
                    const rutaImagen = result[0].urlimg;
                    // Eliminamos la imagen de la base de datos
                    yield database_1.default.query('DELETE FROM imagen WHERE idimagen = ?', [id], (err, _) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            throw err;
                        }
                        try {
                            // Eliminamos el archivo de la carpeta media utilizando fs.unlink
                            yield unlinkAsync(`./${rutaImagen}`);
                            // Si se elimina correctamente, respondemos con un mensaje de éxito
                            res.json({ message: 'Imagen eliminada' });
                        }
                        catch (unlinkError) {
                            // Si ocurre un error al eliminar el archivo, respondemos con un 500
                            res.status(500).json({ message: 'Error al eliminar el archivo de la carpeta media' });
                        }
                    }));
                }
            }));
        });
    }
    //getid
    getidProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const p = database1_1.default.promise();
                const [rows, fields] = yield p.query('SELECT * FROM productos WHERE idProductos = ?', [id]);
                const rows1 = rows;
                const result = yield p.query('SELECT * FROM productos_has_imagen WHERE idProductos = ?', [id]);
                const result1 = result;
                const img = [];
                for (const i of result1[0]) {
                    const result2 = yield p.query('SELECT * FROM imagen WHERE idimagen = ?', [i.idimagen]);
                    const result3 = result2;
                    img.push({
                        idimagen: result3[0][0].idimagen,
                        urlimg: `http://localhost:3000${result3[0][0].urlimg}`
                        //urlimg: `https://www.appopular.me${result3[0][0].urlimg}`
                    });
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
            catch (e) {
                res.status(404).json({ text: e.message });
            }
        });
    }
    //create
    createProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, costo, talla, imagen, stock, idCategoria, id_negocio } = req.body;
            console.log(req.body);
            if (!(nombre && costo && talla && imagen && stock && idCategoria && id_negocio)) {
                res.status(404).json({ message: 'Campos Requeridos' });
                return;
            }
            yield database_1.default.query('call generainventarioinicial(?,?,?,?,?,?,?);', [nombre, costo, talla, imagen, stock, idCategoria, id_negocio], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Categoria Creada' });
            });
        });
    }
    //update
    updateProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, costo, talla, imagen, stock, idCategoria } = req.body;
            const { id } = req.params;
            if (!(nombre && costo && talla && imagen && stock && idCategoria && id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            else {
                yield database_1.default.query('UPDATE productos SET nombre = ?, costo = ?, talla = ?, imagen = ?, stock = ?, idCategoria = ? WHERE idProductos = ?;', [nombre, costo, talla, imagen, stock, idCategoria, id], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'Producto editado' });
                });
            }
        });
    }
    //delete
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('UPDATE productos SET estado=0 WHERE idProductos = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ message: 'Producto eliminado' });
            });
        });
    }
    //Categoria
    //get
    getCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM categoria WHERE estado = 1 AND id_negocio= ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'categoria no existe' });
            });
        });
    }
    //getid
    getidCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM categoria where idCategoria = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'categoria no existe' });
            });
        });
    }
    //create
    createCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Nombre, Descripcion, id_negocio } = req.body;
            if (!(Nombre && Descripcion && id_negocio)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            else {
                yield database_1.default.query('INSERT INTO categoria(Nombre,Descripcion,id_negocio) VALUES(?,?,?);', [Nombre, Descripcion, id_negocio], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'Categoria Creada' });
                });
            }
        });
    }
    //update
    updateCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Nombre, Descripcion } = req.body;
            const { id } = req.params;
            if (!(Nombre && Descripcion && id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('UPDATE categoria SET Nombre = ?, Descripcion = ? WHERE idCategoria = ?;', [Nombre, Descripcion, id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Categoria editada' });
            });
        });
    }
    //delete
    deleteCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('UPDATE categoria estado=0 WHERE idCategoria = ?;', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Categoria eliminada{}' });
            });
        });
    }
    //COMPRAS PRODUCTOS NUEVOS 
    addcomprarproductotmp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idproducto, stock, iduser, compra, costo } = req.body;
            console.log(req.body);
            if (!(idproducto && stock && iduser && costo)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('call agregardetalletmpcompra(?, ?, ?, ?)', [idproducto, stock, iduser, costo], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'producto agregado' });
            });
        });
    }
    //GENERAR COMPRA FINAL
    generarcompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idusuario, idProveedores, num_fac, idnegocio } = req.body;
            console.log(req.body);
            if (!(idusuario && idProveedores && num_fac && idnegocio)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('call detalle_compra(?, ?, ?, ?)', [idusuario, idProveedores, num_fac, idnegocio], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Compra Nueva creada' });
            });
        });
    }
    //vistas compra 
    //FACTURA
    getcompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM viewcompraspro where id_negocio=?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Compras no Encontrados' });
            });
        });
    }
    getIdcompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM compra WHERE idcompra = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Compra no Existe' });
            });
        });
    }
    getIddetallecompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('select * from viewdetallecompra where idcompra = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Detalles de Compra no Existe' });
            });
        });
    }
    //detallecompratemporal
    ListCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM viewcompratemp WHERE idusuario = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.json({ text: 'Compras no Encontrados' });
            });
        });
    }
    deletecompratmp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM compra_detalle_temporal WHERE idusuario = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ message: 'detalle elimnado' });
            });
        });
    }
    deleteidcompratmp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM compra_detalle_temporal WHERE  idcompra_detalletemp = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ message: 'detalle elimnado' });
            });
        });
    }
}
exports.productoController = new ProductoController;
