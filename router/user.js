const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: String,
    constraseña: String,
})

module.exports = mongoose.model("usuarios", userSchema)