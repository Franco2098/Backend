import contenedorDaoKnex from "./contenedorDaoKnex.js"
import contenedorDaoMongo from "./contenedorDaoMongo.js"

import config from "../config.js"

const option = process.argv[2]
let productosDao
let mensajesDao
let usuariosDao

import Usuarios from "../user.js"
import Mensajes from "../mensajes.js"
import Productos from "../productos.js"


switch(option){
    case "knex":
        productosDao = new contenedorDaoKnex(config.mariaDb,"productos")
        mensajesDao = new contenedorDaoKnex(config.mariaDb,"mensajes")       
        break;
        
    default:
        productosDao = new contenedorDaoMongo(Productos)
        mensajesDao = new contenedorDaoMongo(Mensajes)
        usuariosDao = new contenedorDaoMongo(Usuarios)

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
}