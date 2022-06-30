const express = require("express");
const {faker} = require("@faker-js/faker")

const { Router } = express;

let router = new Router();

const knex = require("../db")

const contenedor = require("./metodos.js")

const contenedor1 = new contenedor("productos")

router.get('/formulario', (req, res) => {
    res.render("formulario")
 })

router.get('/productos', (req, res) => {
    contenedor1.getAll(res)
 })

 router.get('/productos/:id', (req, res) => {
    contenedor1.getById(req.params.id, res)
})

router.post("/productos", (req, res) => {
    contenedor1.save(req.body).then( ()=> res.send("Producto añadido"))
})

router.put("/productos/:id", (req,res)=> {
    knex("users")
    .where({id: req.params.id})
    .update({name: req.body.name, price: req.body.price})
    .then(()=> {
        res.send({ message: "User update"})
    })
    .catch((err) => {
        console.log(err);
    });
})


router.delete("/productos/:id", (req,res)=> {
    contenedor1.deleteById(req.params.id, res)
})

router.delete("/productos", (req,res)=> {
    contenedor1.deleteAll(res)
})

router.post("/productos-test", (req,res)=> {
    for(let i=0; i < 5; i++) {
        const obj = { name: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.business()
        }
        contenedor1.save(obj)
    }
    res.send("Productos añadidos")
})

module.exports = router;