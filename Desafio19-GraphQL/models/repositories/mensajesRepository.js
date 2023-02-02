import Mensaje from '../model/mensajes.js';
import MensajeDto from '../dto/mensajeDto.js';
import MensajeDaosFactory from '../daos/mensajeDaoFactory.js';

export default class MensajeRepository {
    constructor() {
        this.dao = MensajeDaosFactory.getMensajeDao();
    }
    async save(mensaje) {
        const mensajeDto = await this.dao.save(new MensajeDto(mensaje));
        return new Mensaje(mensajeDto);
    }

    async getAll() {
        const mensajesDto = await this.dao.getAll();

        return mensajesDto.map((mensajeDto) => new Mensaje(mensajeDto));
    }
    async getById(id) {
        const mensajeDto = await this.dao.getById(id);
        return new Mensaje(mensajeDto);
    }
    async updateById(id, dato) {
        const mensajeDto = await this.dao.updateById(id, dato);
        return new Mensaje(mensajeDto);
    }
    async deleteById(id) {
        await this.dao.deleteById(id);
        return;
    }
}