import config from '../../config.js';
import ProductosDaosMemoria from './productos/productosDaosMemoria.js';
import ProductosDaosArchivo from './productos/productosDaosArchivo.js';
import ProductosDaosMongoDb from './productos/productosDaosMongoDb.js';

class ProductosDaosFactory {
    static getProductosDao() {
        switch (config.dao.persistencia) {
            case "mongo":
                return ProductosDaosMongoDb.getInstance();
            case "archivo":
                return ProductosDaosArchivo.getInstance();
            default:
                return ProductosDaosMemoria.getInstance();
        }
    }
}

export default ProductosDaosFactory;