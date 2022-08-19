const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    nombre: String,
    plataforma: Array,
    precio: Number,
    categoria: String,
    imagen: String,
})

module.exports = mongoose.model("carrito", carritoSchema)