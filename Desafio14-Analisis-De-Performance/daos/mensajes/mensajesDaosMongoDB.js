const MensajeModel = require ('../../models/mensajes.js');
const ContenedorMongoDb = require ('../../contenedores/ContenedorMongoDb.js');

class MensajesDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(MensajeModel);
      }
}
module.exports = MensajesDaosMongoDb;