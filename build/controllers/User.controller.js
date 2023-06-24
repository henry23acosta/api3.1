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
exports.usercontroller = void 0;
const database_1 = __importDefault(require("../database"));
const md5_1 = __importDefault(require("md5"));
class UserController {
    //una respuesta sincronica con la base
    //public create(req: Request, res: Response){
    //  res.json({text: 'createuser'});
    //}
    //Roles
    listRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM rol', (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Roles no Encontrados' });
            });
        });
    }
    getRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM rol  WHERE Id_rol = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Rol no existe' });
            });
        });
    }
    createrol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Tipo_rol, Descripcion, estado } = req.body;
            yield database_1.default.query('INSERT INTO rol(Tipo_rol,Descripcion,estado)VALUES(?, ?, ?)', [Tipo_rol, Descripcion, estado], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Rol Creado' });
            });
        });
    }
    editRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Tipo_rol, Descripcion, estado } = req.body;
            const { id } = req.params;
            if (!(Tipo_rol && Descripcion && estado && id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('UPDATE rol SET Tipo_rol = ?, Descripcion = ?, estado = ? WHERE Id_rol = ?', [Tipo_rol, Descripcion, estado, id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Rol editado' });
            });
        });
    }
    deleteRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM rol WHERE Id_rol = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Rol eliminado' });
            });
        });
    }
    //Usuarios
    listUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM usuario', (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Usuarios no Encontrados' });
            });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            yield database_1.default.query('SELECT * FROM usuario WHERE idusuario = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Usuario no existe' });
            });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, usuario, password, telefono, correo, Estado, imagen } = req.body;
            if (!(nombre && usuario && password && telefono && correo && Estado && imagen)) {
                res.status(404).json({ message: 'campos requerios' });
            }
            else {
                let pass = (0, md5_1.default)(password);
                yield database_1.default.query('INSERT INTO usuario(nombre,user,password,telefono,correo,Estado, imagen) VALUES (?,?,?,?,?,?,?)', [nombre, usuario, pass, telefono, correo, Estado, imagen], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'Usuario creado' });
                });
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, usuario, password, telefono, correo, Estado, imagen } = req.body;
            const { id } = req.params;
            if (!(nombre && usuario && password && telefono && correo && Estado && imagen && id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            else {
                yield database_1.default.query('UPDATE usuario SET nombre = ? ,usuario = ? ,password=?, telefono = ? ,correo = ? ,Estado = ?, imagen=? WHERE id_usuario = ?', [nombre, usuario, password, telefono, correo, Estado, imagen, id], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'Usuario editado' });
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM usuario WHERE id_usuario = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Usuario eliminado' });
            });
        });
    }
    //Autentificacion
    listAuten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM autentificacion', (err, result) => {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getAuten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM autentificacion  WHERE idAutenticacion = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'No autentificado' });
            });
        });
    }
    createAuten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, contrasena, Usuarios_idUsuarios, Roles_idRoles } = req.body;
            let pass = (0, md5_1.default)(contrasena);
            if (!(usuario && contrasena && Usuarios_idUsuarios && Roles_idRoles)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('INSERT INTO autentificacion(usuario,contrasena, Usuarios_idUsuarios, Roles_idRoles)VALUES( ?, ?, ?,?)', [usuario, pass, Usuarios_idUsuarios, Roles_idRoles], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Autenticacion Creada' });
            });
        });
    }
    editAuten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, contrasena, Usuarios_idUsuarios, Roles_idRoles } = req.body;
            const { id } = req.params;
            let pass = (0, md5_1.default)(contrasena);
            if (!(usuario && contrasena && Usuarios_idUsuarios && Roles_idRoles && id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('UPDATE autentificacion SET usuario = ?, contrasena = ?, Usuarios_idUsuarios =?, Roles_idRoles =? WHERE idAutenticacion = ?', [usuario, pass, Usuarios_idUsuarios, Roles_idRoles, id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Autenficicacion editada' });
            });
        });
    }
    deleteAuten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM autentificacion WHERE idAutenticacion = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Autentificacion eliminado' });
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, telefono, correo, imagen } = req.body;
            if (!(id && nombre && telefono && correo && imagen)) {
                res.status(404).json({ message: 'Campos Requeridos' });
                return;
            }
            yield database_1.default.query('UPDATE usuario SET nombre = ?, telefono = ?, correo = ?, imagen =? WHERE idusuario = ?;', [nombre, telefono, correo, imagen, id], (err, result) => {
                if (err)
                    throw err;
                res.json({ message: 'Usuario Actualizado' });
            });
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { password, repetpassword } = req.body;
            if (!(id && password && repetpassword)) {
                res.status(404).json({ message: 'Campos Requeridos' });
                return;
            }
            if (password != repetpassword) {
                res.status(404).json({ message: 'Contraseñas no son Iguales' });
                return;
            }
            let pass = (0, md5_1.default)(password);
            yield database_1.default.query('UPDATE usuario SET password = ? WHERE idusuario = ?', [pass, id], (err, result) => {
                if (err)
                    throw err;
                res.json({ message: 'Cotraseña Actualizada' });
            });
        });
    }
}
exports.usercontroller = new UserController;
