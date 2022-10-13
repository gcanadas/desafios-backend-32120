const fs = require("fs");
const encoding = 'utf-8';
const { v4: uuidv4 } = require("uuid");
const prodController = require("./productsController");

// const FileSystemController = require("./FileSystemController"),
//       fsc = new FileSystemController();


const productos = new prodController("./db/productos.json");


class carritoController {
    constructor(archiveName) {
        this.archiveName = archiveName;
    }

    /*Defino metodos internos de la clase*/
    async readArchive (archiveName) {
        try {
            const data = await fs.promises.readFile(archiveName, encoding);
            return JSON.parse(data);
        } catch (err) {
            if(err.code === 'ENOENT') {
                return 'ENOENT';
            }
            console.log('Ocurrio un error durante la lectura del archivo:', err);
            throw new Error(err.message);
        }
    }

    async writeArchive (archiveName, content) {
        try {
            await fs.promises.writeFile(archiveName, JSON.stringify(content, null, 2));
        } catch (err) {
            console.log('Ocurrio un error durante la escritura del archivo:', err);
            throw new Error(err.message)
        }
    }

    async newCart() {
        try {
              const carts = await this.readArchive(this.archiveName);
              let cart = {};
              cart["id"] = uuidv4();
              cart["timestamp"] = new Date().toLocaleString();
              cart["productos"] = [];
              console.log(cart);
              carts.push(cart);
              await this.writeArchive(this.archiveName, carts);
              return cart["id"];
        } catch (err) {
              console.log(err);
        }
    }

    async delCart(id) {
        try {
            const carts = await this.readArchive (this.archiveName);
            if(carts.some((cart) => cart.id === id)){
                const cartFilter = carts.filter((cart) => cart.id !== id);
                await this.writeArchive(this.archiveName, cartFilter);
                return
            }
            console.log(`No se encontro ningun producto con el id:${id}`);
            
        } catch (err) {
                console.log(err);
        }
    }

    async newProduct(cartId, productId) {
        try {
                const producto = await productos.getById(productId);
                let cart = await this.getById(cartId);
                let carts = await this.getAll();

                let cartProductos = [];
                cartProductos = [...cart.productos];
                cartProductos.push(producto);

                cart = {...cart, productos: cartProductos};
                carts = carts.filter((cart) => cart.id !== cartId);
                carts.push(cart);

                await this.writeArchive(this.archiveName, carts);
                console.log(`Productos agregado al carrito ${cartId} correctamente`)
            } catch (error) {
                    console.log(error.message);
            }
        }

        async getProduct(cartId) {
            try {
                let productos = [];
                let cart = await this.getById(cartId);
                cart.productos.map((producto) => {
                    productos.push(producto)
                });
                return productos;
            } catch(err) {
                console.log(err);
            }
        }

        async getById (id) {
            try {
                const data = await this.readArchive (this.archiveName);
                if (data === 'ENOENT'){
                    console.log(`No se encontro el archivo`);
                    return null;
                }
                const dataFilter = data.filter((product) => product.id === id);
                if (dataFilter.length === 0) {
                    console.log(`No se encontró ningun carrito con el id: ${id}`);
                    return null;
                }
                return dataFilter[0];
            } catch(err) {
                console.log(err);
            }
        }

        async getAll () {
            try {
                const data = await this.readArchive (this.archiveName);
                if (data === 'ENOENT'){
                    console.log(`No se encontro el archivo`);
                    return null;
                }
                return data;
            } catch(err) {
                console.log(err);
            }
        }


    //   /*Metodo getById para obtener todos los productos del carrito por la id*/
    //   async getByIdProduct(id) {
    //         try {
    //               /*Primero verifica si existe el archivo, */
    //               if (fsc.saberSiExiste(this.file)) {
    //                     const data = await fsc.leerArchivo(this.file);
    //                     /* se filtra el archivo para buscar el carrito con la id ingresada */
    //                     const cartId = data.filter((item) => item.id === id);
    //                     if (cartId.length === 0) {
    //                           /* si no existe se lanza un error */
    //                           throw new Error("No se encontro el ID");
    //                     } else {
    //                           let response = [];
    //                           cartId[0].productos.map((item) => {
    //                                 response.push(item);
    //                           });
    //                           return response;
    //                     }
    //               }
    //         } catch (error) {
    //               console.log(error.message);
    //         }
    //   }
    //   /*Metodo deleteProductById para borrar un prodcuto  del carrito por la id*/
    //   async deleteProductById(idcart, idProd) {
    //         try {
    //               /*Primero verifica si existe el archivo, */
    //               if (fsc.saberSiExiste(this.file)) {
    //                     const data = await fsc.leerArchivo(this.file);
    //                     /* se filtra el archivo para buscar el carrito con la id ingresada */
    //                     const cartId = data.filter(
    //                           (item) => item.id === idcart
    //                     );
    //                     if (cartId.length === 0) {
    //                           /* si no existe se lanza un error */
    //                           throw new Error("No se encontro el ID");
    //                     } else {
    //                           let carts = [];
    //                           cartId[0].productos = cartId[0].productos.filter(
    //                                 (item) => item.id !== idProd
    //                           );
    //                           carts = await this.getAll();
    //                           carts = carts.filter(
    //                                 (item) => item.id !== idcart
    //                           );
    //                           carts.push(cartId[0]);
    //                           await fsc.escribirArchivo(this.file, carts);
    //                     }
    //               }
    //         } catch (error) {
    //               console.log(error.message);
    //         }
    //   }
    //   /*Metodo modificar  un carrito por la id*/
    //   async update(id, content) {
    //         try {
    //               /*Primero verifica si existe el archivo, */
    //               if (fsc.saberSiExiste(this.file)) {
    //                     let data = await fsc.leerArchivo(this.file);

    //                     /* se filtra el archivo para buscar el carrito con la id ingresada */
    //                     let cartId = data.filter((item) => item.id === id);
    //                     if (cartId.length === 0) {
    //                           /* si no existe se lanza un error */
    //                           throw new Error("No se encontro el ID");
    //                     } else {
    //                           /*se elimina el carrito a editar */
    //                           data = data.filter((item) => item.id !== id);
    //                           /*y se agrega uno nuevo con la misma id esditado*/
    //                           cartId = { id: id, ...content };
    //                           data.push(cartId);
    //                           fsc.escribirArchivo(this.file, data);
    //                     }
    //               }
    //         } catch (error) {
    //               console.log(error.message);
    //         }
    //   }
    //   /*Metodo getAll para obtener todos los carritos*/
    //   async getAll() {
    //         try {
    //               /*Primero verifica si existe el archivo, */
    //               if (fsc.saberSiExiste(this.file)) {
    //                     const data = await fsc.leerArchivo(this.file);
    //                     /* se verifica si el archivo esta vacio */
    //                     if (data.length !== 0) {
    //                           return data;
    //                     } else {
    //                           /*si esta vacio se lanza un error */
    //                           throw new Error(
    //                                 `el archivo ${this.file} esta vacio`
    //                           );
    //                     }
    //               }
    //         } catch (error) {
    //               console.log(error.message);
    //         }
    //   }
    //   /*Metodo deleteById para eliminar un carrito por la id*/
    //   async deleteCart(id) {
    //         try {
    //               /*Primero verifica si existe el archivo, */
    //               if (fsc.saberSiExiste(this.file)) {
    //                     const data = await fsc.leerArchivo(this.file);
    //                     /* se verifica que la id exista */
    //                     if (data.some((item) => item.id === id)) {
    //                           const data = await fsc.leerArchivo(this.file);
    //                           /*se elima el carrito */
    //                           const datos = data.filter(
    //                                 (item) => item.id !== id
    //                           );
    //                           fsc.escribirArchivo(this.file, datos);
    //                     } else {
    //                           /*Si la id no existe se lanza un error */
    //                           throw new Error(
    //                                 `no se encontro el carrito con la id ${id}`
    //                           );
    //                     }
    //               }
    //         } catch (error) {
    //               console.log(error.message);
    //         }
    //   }

    //   /*Metodo deleteAll para eliminar todos los  carritos */
    //   async deleteAll() {
    //         try {
    //               /*Primero verifica si existe el archivo, */
    //               if (fsc.saberSiExiste(this.file)) {
    //                     /*Para eliminar se escribe un objeto vacio */
    //                     let nuevo = [];
    //                     await fsc.escribirArchivo(this.file, nuevo);
    //               }
    //         } catch (error) {
    //               console.log(error.message);
    //         }
    //   }
}
module.exports = carritoController;