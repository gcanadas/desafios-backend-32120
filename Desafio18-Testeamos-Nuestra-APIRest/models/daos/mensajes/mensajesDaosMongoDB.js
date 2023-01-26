import MensajeModel from '../../model/mensajes.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';

let instance = null;

class MensajesDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(MensajeModel);
      }
      static getInstance() {
            if (!instance) {
                  instance = new MensajesDaosMongoDb();
            }
            return instance;
      }
}
export default MensajesDaosMongoDb;