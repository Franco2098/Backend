import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    nombre: String,
    constraseña: String,
})

export default mongoose.model("usuarios", userSchema)