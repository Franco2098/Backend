const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: String,
    contraseña: String,
    email: String,
    edad: Number,
    tel: Number,
    direccion: String,
    foto: String,
})

module.exports = mongoose.model("usuarios", userSchema)