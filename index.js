
const express = require("express")
const app = express()

const contenedor = require("./clase")

const contenedor1 = new contenedor("productos.txt")


const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error `))

app.get('/productos', (req, res) => {
    contenedor1.getAll().then(pro => res.send(pro))
 })

 app.get('/productoRandom', (req, res) => {
    contenedor1.getAll().then(pro => { 
    let idRandom = Math.ceil(Math.random() * pro.length)
    contenedor1.getById(idRandom).then(pro1 => res.send(pro1))
    })
 })

 