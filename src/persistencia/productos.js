import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
    nombre: String,
    plataforma: Array,
    precio: Number,
    categoria: String,
    imagen: String
})

export default mongoose.model("productos", productSchema)