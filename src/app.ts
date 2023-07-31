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
import mediaRouter from './routers/media.router';
import './config/config.passport';
import 'dotenv/config';
import fileUpload from 'express-fileupload';

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
        this.app.use(fileUpload());
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.set('views', __dirname+'/views');
        this.app.set('view engine', 'ejs');
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.static('./public'));
    }

    routes(): void {
        this.app.get('/',(req,res)=>{
            res.render('index',{
                title: 'api online',
            });
        });
        this.app.use('/user', userRouter);
        this.app.use('/compra', compraRouter);
        this.app.use('/negocio', negocioRouter);
        this.app.use('/categoria', productosRouter);
        this.app.use('/producto', productosRouter);
        this.app.use('/register', RegisterRouter);
        this.app.use('/auth', authRouter );
        this.app.use('/kardex', KardexRouter);
        this.app.use('/cliente', clienteRouter);
        this.app.use('/media', mediaRouter);
        this.app.use('/proveedor', ProveedoresRouter);
        this.app.use('/checkin', CheckinRouter );
        this.app.use('/media', express.static('./media'));
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

