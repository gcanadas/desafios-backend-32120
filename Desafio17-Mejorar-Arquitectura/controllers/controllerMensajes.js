import ServiceMensaje from '../services/mensaje.services.js';
import normalizarMensaje from './normalizerController.js';

class ControllerMensajes {
    constructor() {}

    async getAll() {
        const data = await ServiceMensaje.getAll();
        const mensajes = await normalizarMensaje(data);
        return mensajes;
    }
    async save(data) {
        const mensaje = await ServiceMensaje.save(data);
        return mensaje;
    }
}

export default new ControllerMensajes();