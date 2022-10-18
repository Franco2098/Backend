import contenedorDaoMongo from "./contenedorDaoMongo.js"

const option = process.argv[2]
let productosDao
let mensajesDao
let usuariosDao
let carritoDao

import Usuarios from "../user.js"
import Mensajes from "../mensajes.js"
import Productos from "../productos.js"
import Carrito from "../carritoMongo.js"


switch(option){
    case "knex":
        //Al final solo trabaje con la base de datos de mongo      
        break;
        
    default:
        productosDao = new contenedorDaoMongo(Productos)
        mensajesDao = new contenedorDaoMongo(Mensajes)
        usuariosDao = new contenedorDaoMongo(Usuarios)
        carritoDao = new contenedorDaoMongo(Carrito)

}

export default class Factory {
    static crearDaoProductos(){
        return productosDao
    }
    static crearDaoMensajes(){
        return mensajesDao
    }
    static crearDaoUsuarios(){
        return usuariosDao
    }
    static crearDaoCarrito(){
        return carritoDao
    }
}