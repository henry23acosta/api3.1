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
class ProductoController {
    //Producto
    //get
    getProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`SELECT p.idProductos, p.nombre, p.costo, p.talla,`
                + ` p.imagen, p.stock, p.estado,CONCAT(c.Nombre,'( ', c.Descripcion,' )') ` +
                ` as categoria, p.id_negocio FROM productos p INNER JOIN categoria c WHERE ` +
                `p.idCategoria = c.idCategoria AND p.estado = 1 AND p.id_negocio = ?`, [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Productos no Encontrados' });
            });
        });
    }
    getProductoCateg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM productos WHERE idCategoria = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.json({ text: 'Productos no Encontrados' });
            });
        });
    }
    //getid
    getidProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT* FROM productos WHERE idProductos = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Rol no existe' });
            });
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
