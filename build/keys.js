"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
};
//Conexion local evn 
//PORT = 3000
//DB_HOST = 'localhost'
//DB_USER =  'node'
//DB_PASSWORD = 'root'
//DB_DATABASE = 'appopu2023'
//GMAIL_USER = 'popularcentrocomercial@gmail.com'
//GMAIL_PASSWORD = 'zzqdddrcatnaabhh' 
