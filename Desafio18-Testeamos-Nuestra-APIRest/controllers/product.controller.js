import ServiceProductos from '../services/product.services.js';

class ControllerProductos {
    constructor() {}

    async getAll(req, res) {
        return res.status(200).json(await ServiceProductos.getAll());
    }

    async getById(req, res) {
        const { idProduct } = req.params;
        return res.status(200).json(await ServiceProductos.getById(idProduct));
    }

    async save(req, res) {
        const { body } = req;
        return res.status(201).json(await ServiceProductos.save(body));
    }

    async updateById(req, res) {
        const { body } = req;
        await ServiceProductos.updateById(body.id, body);
        return res.status(200).json(await ServiceProductos.getById(body.id))
    }

    async deleteById(req, res) {
        const { idProduct } = req.params;
        return res.status(200).json(await ServiceProductos.deleteById(idProduct));
    }

    async deleteAll(req, res) {
        await ServiceProductos.deleteAll();
        return res.status(200).json(await ServiceProductos.getAll());
    }
}

export default new ControllerProductos();