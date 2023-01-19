import Mensaje from '../models/model/mensajes.js';
import MensajeRepository from './../models/repositories/mensajesRepository';
import MensajeDto from './../models/dto/mensajeDto.js';

const repository = new MensajeRepository();

class ServiceMensajes {
      constructor() {}

      async getAll() {
            const mensajes = await repository.getAll();
            return mensajes.map((mensaje) => new MensajeDto(mensaje));
      }

      async save(data) {
            const mensaje = await repository.save(new Mensaje(data));
            return new MensajeDto(mensaje);
      }
}
export default new ServiceMensajes();