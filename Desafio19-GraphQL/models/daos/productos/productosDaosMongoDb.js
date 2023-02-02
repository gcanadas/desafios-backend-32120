import ProductoModel from '../../model/productos.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';

let instance = null;
class ProductosDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(ProductoModel);
            this.connect();
      }
      static getInstance() {
            if (!instance) {
                  instance = new ProductosDaosMongoDb();
            }
            return instance;
      }
}
export default ProductosDaosMongoDb;