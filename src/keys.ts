import 'dotenv/config';
export default {
    database: {
        host: process.env.DB_HOST as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_DATABASE as string
    }
  }

  //Conexion local evn 
//PORT = 3000
//DB_HOST = 'localhost'
//DB_USER =  'node'
//DB_PASSWORD = 'root'
//DB_DATABASE = 'appopu2023'
//GMAIL_USER = 'popularcentrocomercial@gmail.com'
//GMAIL_PASSWORD = 'zzqdddrcatnaabhh' 