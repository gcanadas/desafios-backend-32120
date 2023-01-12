import MensajeModel from '../../models/mensajes.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';

class MensajesDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(MensajeModel);
      }
}
export default MensajesDaosMongoDb;