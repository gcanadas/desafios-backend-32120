const mongoose = require ('mongoose');
const config = require ('../config.js');

class ContenedorMongoDb {
    constructor(model) {
        this.collection = model;
    }
    async connect() {
        try {
            await mongoose.connect(config.config.mongoDB.URI);
            console.log('Conectado correctamente a la Base de datos MongoDb');
        } catch (err) {
            logger.error('Error en el metodo connect de ContenedorMongoDb', err.message);
            //console.log('Error en el metodo connect de ContenedorMongoDb', err.message);            
        }
    }
    /*Metodo para obtener todos los elementos del archivo*/
    async getAll() {
        try {
            const data = await this.collection.find({}, { __v: 0 });
            return data;
        } catch (err) {
            logger.error('Error en el metodo getAll de ContenedorMongoDb', err.message);
            //console.log('Error en el metodo getAll de ContenedorMongoDb', err.message);
        }
    }
    /*Metodo para obtener un elemento del archivo por id*/
    async getById(id) {
        try {
            const data = await this.collection.find({ _id: id });
            if (data.length === 0) {
                //logger.info(`No se encontraron elementos con el id: ${id} en la base de datos`);
                console.log(`No se encontraron elementos con el id: ${id} en la base de datos`);
                return null;
            }
            return data[0];
            } catch (err) {
                logger.error('Error en el metodo getById de ContenedorMongoDb', err.message);
                //console.log('Error en el metodo getById de ContenedorMongoDb', err.message);
            }
    }
    /*Metodo para guardar un elementos en el archivo*/
    async save(element) {
        try {
            const user = this.collection(element);
            const result = await user.save()
            console.log(result)
            return result
        } catch (err) {
            logger.error('Error en el metodo save de ContenedorMongoDb', err.message);
            //console.log('Error en el metodo save de ContenedorMongoDb', err.message);
        }
    }
    /*Metodo para eliminar un elementos en el archivo por el id*/
    async deleteById(id) {
        try {
            const data = await this.getAll();
            if(data.some((product) => product._id.toString() === id)){
                await this.collection.deleteOne({ _id: id });
                return
            }
            console.log('No se encontro ningun elemento con ese id');
            return
        } catch (err) {
            logger.error('Error en el metodo deleteById de ContenedorMongoDb', err.message);
            //console.log('Error en el metodo deleteById de ContenedorMongoDb', err.message);
        }
    }
    /*Metodo para borrar todos los elementos en el archivo*/
    async deleteAll() {
        try {
            await this.collection.deleteMany({});
            return
        } catch(err) {
            logger.error('Error en el metodo deleteAll de ContenedorMongoDb', err.message);
            //console.log('Error en el metodo deleteAll de ContenedorMemoria', err.message);
        }
    }
    /*Metodo para Modificar */
    async updateById(id, element) {
        try {
            const result = await this.collection.updateOne({ _id: id },{ $set: element });         
            return result
        } catch (err) {
            logger.error('Error en el metodo updateById de ContenedorMongoDb', err.message);
            // console.log('Error en el metodo updateByID de ContenedorMongoDB', err.message);
        }
    }
}
module.exports = ContenedorMongoDb;