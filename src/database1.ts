import mysql from 'mysql2';

import keys from './keys';
//constante pool para un archivo grande de datos 
const pool = mysql.createPool(keys.database);
//Genera dos variables una para la conexion y otra para error(llamar)
pool.getConnection((err, conn) => {
  if (err) {
    console.log(err);
  }
  conn.release();
  console.log("DB to Connet")
});
//Salir de nuevo a la variable pool 
export default pool;