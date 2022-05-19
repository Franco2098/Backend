const express = require("express");

const { Router } = express;

let router = new Router();

const knex = require("../db")

const contenedor = require("./metodos.js")

const contenedor1 = new contenedor("productos.json")

router.get('/formulario', (req, res) => {
    res.render("formulario")
 })

router.get('/productos', (req, res) => {
    contenedor1.getAll(knex, res)
 })

 router.get('/productos/:id', (req, res) => {
    contenedor1.getById(req.params.id, knex, res)
})

router.post("/productos", (req, res) => {
    contenedor1.save(req.body, knex)
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
    contenedor1.deleteById(req.params.id, knex, res)
})

router.delete("/productos", (req,res)=> {
    contenedor1.deleteAll(knex, res)
})


module.exports = router;

