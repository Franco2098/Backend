const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: String,
    plataforma: Array,
    precio: Number,
    categoria: String,
    imagen: String,
})

module.exports = mongoose.model("productos", productSchema)