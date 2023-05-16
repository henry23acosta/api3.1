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
exports.negociocontroller = void 0;
const database_1 = __importDefault(require("../database"));
class NegocioController {
    //NEGOCIO
    getNegocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM negocio', (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Negocios no Encontrados' });
            });
        });
    }
    getIdNegocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM negocio WHERE id_negocio = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Negocio no Existe' });
            });
        });
    }
    createNegocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, ruc, direccion, telefono, correo } = req.body;
            if (!(nombre && ruc && direccion && telefono && correo)) {
                res.status(404).json({ message: 'campos requeridos' });
            }
            else {
                yield database_1.default.query('INSERT INTO negocio(nombre,ruc,direccion,telefono,correo)VALUES(?,?,?,?,?)', [nombre, ruc, direccion, telefono, correo], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'Negocio Creado' });
                });
            }
        });
    }
    updateNegocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, ruc, direccion, telefono, correo } = req.body;
            const { id } = req.params;
            yield database_1.default.query('UPDATE negocio SET nombre = ?, ruc = ?, direccion = ?, telefono = ?, correo = ? WHERE id_negocio = ?', [nombre, ruc, direccion, telefono, correo, id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Negocio Actualizado' });
            });
        });
    }
    deleteNegocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM negocio WHERE id_negocio= ?;', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Negocio eliminado' });
            });
        });
    }
}
exports.negociocontroller = new NegocioController;
