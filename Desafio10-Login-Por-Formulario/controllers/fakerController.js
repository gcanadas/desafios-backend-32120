const { faker } = require('@faker-js/faker/locale/es_MX');

const { commerce, image } = faker;

function randomProducts(cant = 5) {

    let data = { products: [] };

    for (let i = 0; i < cant; i++) {
        data.products.push({
              name: commerce.product(),
              price: commerce.price(),
              URL: image.avatar(),
        });
    }
    return data;
}

module.exports = randomProducts;
