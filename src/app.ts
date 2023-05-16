import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routers/User.Router';
import authRouter from './routers/Auth.Router';
import compraRouter from './routers/Compra.Router';
import clienteRouter  from './routers/Cliente.Routert';
import negocioRouter from './routers/Negocio.Router';
import productosRouter from './routers/Productos.Router';
import ProveedoresRouter from './routers/Proveedores.Router';
import CheckinRouter from './routers/Checkin.Router'; 
import RegisterRouter from './routers/Register.Router';
import KardexRouter from './routers/Kardex.Router';
import './config/config.passport';
class Server{
    
    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        var corsOptions= {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        
    }

    routes(): void {
        this.app.use('/user', userRouter);
        this.app.use('/compra', clienteRouter);
        this.app.use('/negocio', negocioRouter);
        this.app.use('/categoria', productosRouter);
        this.app.use('/producto', productosRouter);
        this.app.use('/register', RegisterRouter);
        this.app.use('/auth', authRouter );
        this.app.use('/kardex', KardexRouter);
        this.app.use('/cliente', clienteRouter);
        //this.app.use('/nego', indexrouternegocio);
        this.app.use('/proveedor', ProveedoresRouter);
        this.app.use('/checkin', CheckinRouter );
        //this.app.use( TodoController );
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();
function IndexRouter_Productos(arg0: string, IndexRouter_Productos: any) {
    throw new Error('Function not implemented.');
}

