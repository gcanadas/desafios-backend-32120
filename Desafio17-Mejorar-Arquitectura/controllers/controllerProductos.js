import ServiceProductos from '../services/productos.services.js';

class ControllerProductos {
    constructor() {}

    async getAll() {
        return await ServiceProductos.getAll();
    }

    async save(data) {
        await ServiceProductos.save(data);
        const productos = await ServiceProductos.getAll();
        return productos;
    }

    async deleteById(id) {
        await ServiceProductos.deleteById(id);
        const productos = await ServiceProductos.getAll();
        return productos;
    }
    async getById(id) {
        const productos = await ServiceProductos.getById(id);
        return productos;
    }
    async updateById(id, data) {
        await ServiceProductos.updateById(id, data);
        const productos = await ServiceProductos.getAll();
        return productos;
    }
}

export default new ControllerProductos();