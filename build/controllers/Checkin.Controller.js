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
exports.checkInController = void 0;
const database_1 = __importDefault(require("../database"));
class CheckInController {
    //FACTURA
    getfacturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM viewVentas where id_negocio=?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Facturas no Encontrados' });
            });
        });
    }
    getIdfacturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM factura WHERE idFactura = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Proveedor no Existe' });
            });
        });
    }
    getIddetallefacturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('select * from viewdetallefac where idFactura = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Detalles de Factura no Existe' });
            });
        });
    }
    //detalleFactura
    ListCheckin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM viewfactura WHERE idusuario = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.json({ text: 'facturas no Encontrados' });
            });
        });
    }
    addproductofacturatmp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { producto, cantidad, usuario, valorfinal } = req.body;
            console.log(req.body);
            if (!(producto && cantidad && usuario && valorfinal)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('call disminuirproducto(?, ?, ?, ?)', [producto, cantidad, usuario, valorfinal], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'producto agregado' });
            });
        });
    }
    dissproductofacturatmp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('call aumentarproductos(?);', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'producto Eliminado' });
            });
        });
    }
    generarfactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idusuario, idcliente, idnegocio } = req.body;
            if (!(idusuario && idcliente && idnegocio)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('call detalle_fac(?, ?, ?)', [idusuario, idcliente, idnegocio], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'factura creada' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM factura_detalle_temp WHERE idfactura_detalle_temp = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'factura eliminado' });
            });
        });
    }
    dropdetafactemp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('Delete from factura_detalle_temp where idusuario= ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'factura temporal eliminada' });
            });
        });
    }
}
exports.checkInController = new CheckInController;
