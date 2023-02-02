import ProductServices from '../services/product.services.js';

export function getProducts() {
    return ProductServices.getAll();
};

export function getProductById({ id }) {
    return ProductServices.getById(id);
};

export function createProduct({ data }) {
    return ProductServices.save(data);
};

export function updateProduct({ id, data }) {
    return ProductServices.updateById(id, data);
};

export function deleteProductById({ id }) {
    return ProductServices.deleteById(id);
};