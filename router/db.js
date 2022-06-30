const knex = require("knex")({
    client:"mysql",
    connection:{
        host:"localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "francoDataBase"
    },
    pool: {min: 2, max:8} 
})

knex.schema.createTableIfNotExists("productos", function(table){
    table.increments("id").primary()
    table.string("name")
    table.string("price")
    table.string("thumbnail")
})
.then(()=> {
    console.log("conexion y tabla creada")
})
.catch((err) => {
    console.log(err)
})

knex.schema.createTableIfNotExists("mensajes", function(table){
    table.string("email")
    table.string("name")
    table.string("lastname")
    table.string("age")
    table.string("alias")
    table.string("avatar")
    table.string("msn")
})
.then(()=> {
    console.log("conexion y tabla creada")
})
.catch((err) => {
    console.log(err)
})


module.exports = knex
