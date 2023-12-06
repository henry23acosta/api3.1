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
exports.proveedoresController = void 0;
const database_1 = __importDefault(require("../database"));
class ProveedoresController {
    //NEGOCIO
    getProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM proveedores WHERE estado = 1 AND id_negocio=?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Proveedores no Encontrados' });
            });
        });
    }
    getIdProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM proveedores WHERE idProveedores = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Proveedor no Existe' });
            });
        });
    }
    createProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, nombre, direccion, telefono, email, estado, bancos, Cuenta_bancaria, id_negocio } = req.body;
            console.log(req.body);
            if (!(identificacion && nombre && direccion && telefono && email && estado && bancos && Cuenta_bancaria && id_negocio)) {
                res.status(404).json({ message: 'Campos Requeridos' });
                return;
            }
            else {
                yield database_1.default.query('INSERT INTO proveedores(identificacion,nombre,direccion,telefono,email,estado,bancos,Cuenta_bancaria,id_negocio)VALUES(?,?,?,?,?,?,?,?,?)', [identificacion, nombre, direccion, telefono, email, estado, bancos, Cuenta_bancaria, id_negocio], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'Proveedor Creado' });
                });
            }
        });
    }
    updateProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, nombre, direccion, telefono, email, bancos, estado, Cuenta_bancaria } = req.body;
            const fecha_update = new Date();
            const { id } = req.params;
            yield database_1.default.query('UPDATE proveedores SET identificacion = ?, nombre = ?, direccion = ?, telefono = ?, email = ?, estado = ?,bancos=?, Cuenta_bancaria = ?, fecha_update=? WHERE idProveedores = ?', [identificacion, nombre, direccion, telefono, email, estado, bancos, Cuenta_bancaria, fecha_update, id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Proveedor Actualizado' });
            });
        });
    }
    deleteProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('UPDATE proveedores SET estado = 0    WHERE idProveedores = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Proveedor eliminado' });
            });
        });
    }
}
exports.proveedoresController = new ProveedoresController;
