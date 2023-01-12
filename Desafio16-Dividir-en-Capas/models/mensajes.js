import mongoose, { Schema } from 'mongoose';

const mensajeSchema = new Schema({
    author: { type: Object, required: true},
    text: { type: Object, required: true },
});

export default mongoose.model('Mensaje', mensajeSchema);
