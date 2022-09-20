import mongoose from "mongoose"

const msjSchema = new mongoose.Schema({
    email: String,
    name: String,
    lastname: String,
    age: Number,
    alias: String,
    avatar: String,
    msn: String,
})

export default mongoose.model("mensajes", msjSchema)