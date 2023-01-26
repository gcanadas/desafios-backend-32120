import config from '../../config.js';
import MensajesDaosMemoria from './mensajes/mensajesDaosMemoria.js';
import MensajesDaosArchivo from './mensajes/mensajesDaosArchivo.js';
import MensajesDaosMongoDb from './mensajes/mensajesDaosMongoDB.js'

class MensajesDaosFactory {
    static getMensajeDao() {
        switch (config.dao.persistencia) {
            case "mongo":
                return MensajesDaosMongoDb.getInstance();
            case "archivo":
                return MensajesDaosArchivo.getInstance();
            default:
                return MensajesDaosMemoria.getInstance();
        }
    }
}

export default MensajesDaosFactory;