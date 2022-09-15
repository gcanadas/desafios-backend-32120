const express = require('express');
const Contenedor = require("./contenedor.js");

const productos = new Contenedor("./productos.txt");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en Servidor ${error}`))

app.get('/', (req, res) => {
    res.send('<h1 style="color: green"> Desafío 3 del curso de Programación Backend </h1>')
})

app.get('/productos', (req, res) => {
    const getProducts = async() => {
        const allProducts = await productos.getAll();
        res.send(allProducts);
    }
    getProducts();
})

app.get('/productoRandom', (req, res) => {
    const getRandom = async() => {
        const allProducts = await productos.getAll();
        const randomNumber = Math.floor((Math.random() * (allProducts.length + 1)) + 0);
        const dataFilter = allProducts.filter((product, index) => index === randomNumber);
        res.send(dataFilter);
    }
    getRandom();
})