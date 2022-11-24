const mongoose = require ('mongoose');
const { Schema } = mongoose;

const mensajeSchema = new Schema({
    author: { type: Object, required: true},
    text: { type: Object, required: true },
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema, 'mensajes');

module.exports =  Mensaje;
