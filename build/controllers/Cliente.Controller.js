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
exports.clienteController = void 0;
const database_1 = __importDefault(require("../database"));
class ClienteController {
    //NEGOCIO
    getCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM cliente WHERE estado = 1 AND id_negocio=?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Clientes no Encontrados' });
            });
        });
    }
    getCiCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cl, idnegocio } = req.params;
            yield database_1.default.query('SELECT * FROM cliente WHERE identificacion = ?  AND id_negocio = ?', [cl, idnegocio], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Cliente no Existe' });
            });
        });
    }
    getIdCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM cliente WHERE idCliente = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Cliente no Existe' });
            });
        });
    }
    createCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, identificacion, direccion, telefono, correo, id_negocio } = req.body;
            if (!(nombre && identificacion && direccion && telefono && correo && id_negocio)) {
                res.status(404).json({ message: 'campos requeridos' });
            }
            else {
                yield database_1.default.query('INSERT INTO cliente(nombre,identificacion,direccion,telefono,correo,id_negocio)VALUES(?,?,?,?,?,?)', [nombre, identificacion, direccion, telefono, correo, id_negocio], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'cliente Creado' });
                });
            }
        });
    }
    editCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, identificacion, direccion, telefono, correo } = req.body;
            const { id } = req.params;
            yield database_1.default.query('UPDATE cliente SET nombre=?,identificacion=?,direccion=?,telefono=?,correo =? WHERE idProveedores = ?', [nombre, identificacion, direccion, telefono, correo], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Cliente Actualizado' });
            });
        });
    }
    updateCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, identificacion, direccion, telefono, correo } = req.body;
            const fecha_update = new Date();
            const { id } = req.params;
            yield database_1.default.query('UPDATE cliente SET nombre = ?, identificacion = ?, direccion = ?, telefono = ?, correo = ?,fecha_update = ? WHERE idCliente = ?', [nombre, identificacion, direccion, telefono, correo, fecha_update, id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Cliente Actualizado' });
            });
        });
    }
    deleteCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('UPDATE cliente  SET estado = 0 WHERE idCliente = ?;', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Cliente eliminado' });
            });
        });
    }
}
exports.clienteController = new ClienteController;
