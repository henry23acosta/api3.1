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
exports.compraController = void 0;
const database_1 = __importDefault(require("../database"));
class CompraController {
    //Compras
    listCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM compra', (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Compras no Encontras' });
            });
        });
    }
    getCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM compra WHERE idcompra = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Compras no Existe' });
            });
        });
    }
    addprimeraCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nomb, costop, tall, imag, stocprod, idCat } = req.body;
            if (!(nomb && costop && tall && imag && stocprod && idCat)) {
                res.status(404).json({ message: 'campos requeridos' });
            }
            else {
                yield database_1.default.query('call generainventarioinicial(?, ?, ?, ?, ?, ?)', [nomb, costop, tall, imag, stocprod, idCat], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: ' Compra Creada' });
                });
            }
        });
    }
    addCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { detallcmpra, sstockcompra, costproduct } = req.body;
            if (!(detallcmpra && sstockcompra && costproduct)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('call generarcompra(?, ?, ?, ?)', [id, detallcmpra, sstockcompra, costproduct], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Compra Actualizado' });
            });
        });
    }
    deleteCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM compra WHERE idcompra = ?;', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Compra eliminado' });
            });
        });
    }
}
exports.compraController = new CompraController;
