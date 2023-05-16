"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const keys_1 = __importDefault(require("./keys"));
//constante pool para un archivo grande de datos 
const pool = mysql_1.default.createPool(keys_1.default.database);
//Genera dos variables una para la conexion y otra para error(llamar)
pool.getConnection((err, conn) => {
    if (err) {
        console.log(err);
    }
    conn.release();
    console.log("DB to Connet");
});
//Salir de nuevo a la variable pool 
exports.default = pool;
