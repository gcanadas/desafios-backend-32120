import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, require: true, unique: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, },
    password: { type: String, require: true },
},
    { timestamps: true }
);

export default mongoose.model('Usuario', userSchema);
