const Contenedor = require("./Desafio2.js");


const producto1 = {
    title: "PlayStation 3",
    price: 60000,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg",
};
const producto2 = {
    title: "PlayStation 4",
    price: 130000,
    thumbnail: "https://th.bing.com/th/id/OIP.HXa-kFjqTztbJMpplOafPwHaHa?pid=ImgDet&rs=1",
};
const producto3 = {
    title: "PlayStation 5",
    price: 250000,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/PlayStation_5_and_DualSense_with_transparent_background.png/1200px-PlayStation_5_and_DualSense_with_transparent_background.png",
};
const producto4 = {
    title: "Xbox 360",
    price: 50000,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/03/Xbox-360-Consoles-Infobox.png",
};
const producto5 = {
    title: "Xbox One",
    price: 90000,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Microsoft-Xbox-One-Console-wKinect.png/1200px-Microsoft-Xbox-One-Console-wKinect.png",
};

const productos = new Contenedor("./productos.txt");

async function empezar() {
    try{
        const nuevoId1 = await productos.save(producto1);
        console.log(`Se ingreso un producto nuevo con el id: ${nuevoId1}`);
        const nuevoId2 = await productos.save(producto2);
        console.log(`Se ingreso un producto nuevo con el id: ${nuevoId2}`);
        const nuevoId3 = await productos.save(producto3);
        console.log(`Se ingreso un producto nuevo con el id: ${nuevoId3}`);
        const nuevoId4 = await productos.save(producto4);
        console.log(`Se ingreso un producto nuevo con el id: ${nuevoId4}`);
        const nuevoId5 = await productos.save(producto5);
        console.log(`Se ingreso un producto nuevo con el id: ${nuevoId5}`);
        const productoId1 = await productos.getById(3);
        console.log(`El producto que corresponde con ese id es:`);
        console.log(productoId1);
        const productoId2 = await productos.getById(7);
        console.log(`El producto que corresponde con ese id es:`);
        console.log(productoId2);
        const allProducts = await productos.getAll();
        console.log(`A continuación se detallan todos los productos del archivo`);
        console.log(allProducts);
        await productos.deleteById(4);
        await productos.getById(4);
        await productos.deleteAll();
    } catch(err){
        console.log(err)
    }
}

empezar();
