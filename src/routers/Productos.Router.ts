import {Router} from 'express';
import { productoController } from '../controllers/Productos.Controller';
import {chekjwt} from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';

class ProductosRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/productoslist/:id',[chekjwt, checkrole([2,3])],productoController.getProducto);
        this.router.get('/productos/:id',[chekjwt, checkrole([2,3])],productoController.getidProducto);
        this.router.get('/productoscateg/:id',[chekjwt, checkrole([2,3])],productoController.getProductoCateg);
        this.router.post('/productos',[chekjwt, checkrole([2,3])], productoController.createProducto);
        this.router.put('/productos/:id',[chekjwt, checkrole([2,3])], productoController.updateProducto);
        this.router.delete('/productos/:id',[chekjwt, checkrole([2,3])], productoController.deleteProducto);

        this.router.get('/imagencat/:id',[chekjwt, checkrole([2,3])],productoController.getidimagen);
        this.router.post('/imagen', [chekjwt, checkrole([2,3])],productoController.createimagen);
        this.router.put('/imagen/:id',[chekjwt, checkrole([2,3])], productoController.updateimagen);
        this.router.delete('/imagen/:id',[chekjwt, checkrole([2,3])], productoController.deleteimagen);
        this.router.delete('/deletecomplete/:id',[chekjwt, checkrole([2,3])], productoController.deleteimagentotAL);

        this.router.get('/categoriaslist/:id',[chekjwt, checkrole([2,3])], productoController.getCategoria);
        this.router.get('/categorias/:id',[chekjwt, checkrole([2,3])],productoController.getidCategoria);
        this.router.post('/categorias',[chekjwt, checkrole([2,3])], productoController.createCategoria);
        this.router.put('/categorias/:id',[chekjwt, checkrole([2,3])], productoController.updateCategoria);
        this.router.delete('/categorias/:id',[chekjwt, checkrole([2,3])], productoController.deleteCategoria);
        this.router.post('/compra',[chekjwt, checkrole([2,3])], productoController.addcomprarproductotmp); 
        this.router.post('/newcompra',[chekjwt, checkrole([2,3])], productoController.generarcompra);
        this.router.get('/compraview/:id',[chekjwt, checkrole([2,3])],productoController.getcompra);
        this.router.get('/compraid/:id',[chekjwt, checkrole([2,3])],productoController.getIdcompra);
        this.router.get('/compraviewdetall/:id',[chekjwt, checkrole([2,3])],productoController.getIddetallecompra);
        this.router.get('/compratemp/:id',[chekjwt, checkrole([2,3])],productoController.ListCompra);
        this.router.delete('/compratmp/:id',[chekjwt, checkrole([2,3])], productoController.deletecompratmp);
        this.router.delete('/compratmpid/:id',[chekjwt, checkrole([2,3])], productoController.deleteidcompratmp);
    }
}

const productosRouter = new ProductosRouter();
export default productosRouter.router;