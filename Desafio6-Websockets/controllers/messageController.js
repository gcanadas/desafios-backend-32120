const fs = require("fs");
const encoding = 'utf-8';

class Contenedor {
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

    async save (product) {
        try {
            const data = await this.readArchive (this.archiveName);
            if (data === 'ENOENT'){
                console.log(`No se encontro el archivo ${this.archiveName}\n se procede a crear un archivo nuevo`);
                product['id'] = 1;
                let productArray = [];
                productArray.push(product);
                await this.writeArchive(this.archiveName, productArray);
                return product.id;
            }
            let lastId = data[data.length - 1].id;
            product['id'] = lastId + 1;
            data.push(product);
            console.log('Agregando el mensaje al archivo');
            await this.writeArchive(this.archiveName, data);
            return product.id
        } catch (err) {
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

    async deleteAll() {
        try {
            await fs.promises.unlink(this.archiveName);
            console.log('Se borro el archivo con los mensajes');
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = Contenedor;