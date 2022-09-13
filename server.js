import axios from "axios"

export const getProductos = async()=>{
const prod = await axios.get("http://localhost:8080/api/productos")
return prod.data
}

const producto = {"name":"Grand Theft Auto V", "price": 1000, "thumbnail":"/asset/gta5.webp"}

export const postProductos = async(p)=>{
const prodNuevo = await axios.post("http://localhost:8080/api/productos", p)
getProductos()
return prodNuevo.data
}


//getProductos()
//postProductos(producto)