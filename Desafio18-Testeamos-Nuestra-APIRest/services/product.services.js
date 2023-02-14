import Producto from '../models/model/productos.js';
import ProductoRepository from '../models/repositories/productosRepository.js';
import productoDto from '../models/dto/productoDto.js';

const repository = new ProductoRepository();
class ServiceProductos {
    constructor() {}

    async getAll() {
        const productos = await repository.getAll();
        return productos.map((productos) => new productoDto(productos));
    }

    async getById(id) {
        const producto = await repository.getById(id);
        return new productoDto(producto);
    }

    async save(data) {
        const producto = await repository.save(new Producto(data));
        return new productoDto(producto);
    }

    async updateById(id, data) {
        const producto = await repository.updateById(id, data);
        return new productoDto(producto);
    }

    async deleteById(id) {
        await repository.deleteById(id);
        return id;
    }

    async deleteAll() {
        await repository.deleteAll();
        return;
    }
}
export default new ServiceProductos();