const mongoose = require ('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, require: true, unique: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, },
    password: { type: String, require: true },
},
    { timestamps: true }
);

const Usuarios = mongoose.model('Usuario', userSchema, 'usuarios');

module.exports = Usuarios;