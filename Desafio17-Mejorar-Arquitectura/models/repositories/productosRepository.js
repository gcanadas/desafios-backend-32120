import Producto from '../model/productos.js';
import ProductoDto from '../dto/productoDto.js';
import ProductosDaoFactory from '../daos/productoDaoFactory.js';

export default class ProductoRepository {
    constructor() {
        this.dao = ProductosDaoFactory.getProductosDao();
    }

    async save(producto) {
        const productoDto = await this.dao.save(new ProductoDto(producto));
        return new Producto(productoDto);
    }

    async getAll() {
        const productoDto = await this.dao.getAll();
        return productoDto.map((productoDto) => new Producto(productoDto));
    }

    async getById(id) {
        const productoDto = await this.dao.getById(id);
        return new Producto(productoDto);
    }

    async updateById(id, producto) {
        const productoDto = await this.dao.updateById(id, new ProductoDto(producto));
        return new Producto(productoDto);
    }

    async deleteById(id) {
        await this.dao.deleteById(id);
        return;
    }
}