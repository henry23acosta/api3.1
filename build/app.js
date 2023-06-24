"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const User_Router_1 = __importDefault(require("./routers/User.Router"));
const Auth_Router_1 = __importDefault(require("./routers/Auth.Router"));
const Compra_Router_1 = __importDefault(require("./routers/Compra.Router"));
const Cliente_Routert_1 = __importDefault(require("./routers/Cliente.Routert"));
const Negocio_Router_1 = __importDefault(require("./routers/Negocio.Router"));
const Productos_Router_1 = __importDefault(require("./routers/Productos.Router"));
const Proveedores_Router_1 = __importDefault(require("./routers/Proveedores.Router"));
const Checkin_Router_1 = __importDefault(require("./routers/Checkin.Router"));
const Register_Router_1 = __importDefault(require("./routers/Register.Router"));
const Kardex_Router_1 = __importDefault(require("./routers/Kardex.Router"));
require("./config/config.passport");
require("dotenv/config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        var corsOptions = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        };
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.json());
        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'ejs');
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static('./public'));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.render('index', {
                title: 'api online',
            });
        });
        this.app.use('/user', User_Router_1.default);
        this.app.use('/compra', Compra_Router_1.default);
        this.app.use('/negocio', Negocio_Router_1.default);
        this.app.use('/categoria', Productos_Router_1.default);
        this.app.use('/producto', Productos_Router_1.default);
        this.app.use('/register', Register_Router_1.default);
        this.app.use('/auth', Auth_Router_1.default);
        this.app.use('/kardex', Kardex_Router_1.default);
        this.app.use('/cliente', Cliente_Routert_1.default);
        //this.app.use('/nego', indexrouternegocio);
        this.app.use('/proveedor', Proveedores_Router_1.default);
        this.app.use('/checkin', Checkin_Router_1.default);
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
function IndexRouter_Productos(arg0, IndexRouter_Productos) {
    throw new Error('Function not implemented.');
}
