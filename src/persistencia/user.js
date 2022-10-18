import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    nombre: String,
    contraseña: String,
    email: String,
    edad: Number,
    tel: Number,
    direccion: String
})

export default mongoose.model("usuarios", userSchema)