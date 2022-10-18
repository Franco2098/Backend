import mongoose from "mongoose"

const carritoSchema = new mongoose.Schema({
    nombre: String,
    plataforma: Array,
    precio: Number,
    categoria: String,
    imagen: String,
    email: String
})

export default mongoose.model("carrito", carritoSchema)
