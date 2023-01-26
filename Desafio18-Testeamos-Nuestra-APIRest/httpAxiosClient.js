import axios from 'axios';

let idProduct;

try {
    console.log("----Recibir todos los productos (Metodo GET)----");
    const res = await axios.get("http://localhost:8080/productos");
    console.log("Respuesta Método GET \n", res.data);
} catch (error) {
    throw new Error("Error en el método GET", error);
}

try {
    console.log("----Enviar Producto (Metodo POST)----");
    const res = await axios.post("http://localhost:8080/productos", {
        title: "Televisor Samsung QN90B",
        thumbnail: "https://images.samsung.com/is/image/samsung/p6pim/ar/qn50qn90bagczb/gallery/ar-qled-qn90b-qn50qn90bagczb-533665557",
        price: 410000,
        stock: 5
    });
    idProduct = res.data.id;
    console.log("Se agrego un producto (Método POST) con el id: ", idProduct);
} catch (error) {
    throw new Error("Error en el método POST", error);
}

try {
    console.log("----Recibir un productos por su ID (Metodo GET)----");
    const res = await axios.get(`http://localhost:8080/productos/${idProduct}`);
    console.log(`El producto con el ID: ${idProduct} es:`);
    console.log(res.data);
} catch (error) {
    throw new Error("Error en el método GET", error);
}

try {
    console.log("----Modificar Producto (Metodo PUT)----");
    const res = await axios.put("http://localhost:8080/productos", {
        id: idProduct,
        title: "Televisor Samsung QN90B 55 pulgadas",
        thumbnail: "https://images.samsung.com/is/image/samsung/p6pim/ar/qn50qn90bagczb/gallery/ar-qled-qn90b-qn50qn90bagczb-533665557",
        price: 510000,
        stock: 8
    });
    console.log("Producto actualizado:");
    console.log(res.data);
} catch (error) {
    throw new Error("Error en el método PUT", error);
}

try {
    console.log("----Eliminar un producto por su ID (Metodo DELETE)----");
    const res = await axios.delete(`http://localhost:8080/productos/${idProduct}`);
    console.log("Producto eliminado correctamente", res.data);
} catch (error) {
    throw new Error("Error en el método DELETE", error);
}

try {
    console.log("----Eliminar todos los Productos (Metodo DELETE)----");
    const res = await axios.delete(`http://localhost:8080/productos/`);
    console.log("Producto eliminado correctamente", res.data);

} catch (error) {
    throw new Error("Error en el método DELETE", error);
}