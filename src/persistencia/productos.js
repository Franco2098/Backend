import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    thumbnail: String,
})

export default mongoose.model("productos", productSchema)