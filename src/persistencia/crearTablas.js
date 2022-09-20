import knex from 'knex'
import config from './config.js'

crearTablasProductos(knex(config.mariaDb))
crearTablasMensajes(knex(config.mariaDb))

function crearTablasProductos(mariaDbClient) {

mariaDbClient.schema.createTableIfNotExists("productos", function(table){
    table.increments("id").primary()
    table.string("name")
    table.string("price")
    table.string("thumbnail")
})
.then(()=> {
    //console.log("conexion y tabla creada")
})
.catch((err) => {
    console.log(err)
})
}

function crearTablasMensajes(mariaDbClient) {

mariaDbClient.schema.createTableIfNotExists("mensajes", function(table){
    table.string("email")
    table.string("name")
    table.string("lastname")
    table.string("age")
    table.string("alias")
    table.string("avatar")
    table.string("msn")
})
.then(()=> {
    //console.log("conexion y tabla creada")
})
.catch((err) => {
    console.log(err)
})
}