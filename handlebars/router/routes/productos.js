const express = require("express");

const { Router } = express;

let router = new Router();

let id = 1;
let arrayProductos = [];

router.get('/productos', (req, res) => {
    if (arrayProductos.length != 0){
    res.render("products", {data: arrayProductos});
    }else{
        res.send("No hay productos");
    }
 })

 router.get('/productos/:id', (req, res) => {
    if (arrayProductos.length != 0) {
        let productoId = arrayProductos.find(x => {return x.id == req.params.id});
        if (productoId) {
            res.send(productoId);
        }else{
            res.send({error: "Producto no encontrado"});
        }
    }else{
        res.send("No hay productos");
    }   
})

router.post("/productos", (req, res) => {
    if (arrayProductos.length == 0){
        arrayProductos.push(req.body);
        arrayProductos = arrayProductos.map((el) => ({...el, id:1}));
        res.render("formulario")
    }else{
        arrayProductos.push(req.body);
        arrayProductos = arrayProductos.map((el) => ({...el, id: id++}));
        res.render("formulario")
        id = 1;
    }   
})

router.put("/productos/:id", (req,res)=> {
    if (arrayProductos.length != 0){
        if (arrayProductos[req.params.id - 1]){
            res.send(arrayProductos[req.params.id - 1]);
            let productNuevo = {
                title: "Samsung s21",
                price: "$154.999",
                thumbnail: "https://shop.samsung.com",
                id: req.params.id
                }
            arrayProductos = arrayProductos.filter(x => {return x.id != req.params.id});
            arrayProductos.push(productNuevo);
            arrayProductos.sort((a, b) => a.id - b.id);
        }else{
            res.send({error: "Producto no encontrado"});
        }
    }else{
        res.send("No hay productos");
    }
})


router.delete("/productos/:id", (req,res)=> {
    if (arrayProductos.length != 0) {
        cantProductos = arrayProductos.length;
        arrayProductos = arrayProductos.filter(x => {return x.id != req.params.id});
        if (arrayProductos.length != cantProductos) {
            res.send("Producto eliminado");
        }else{
            res.send({error: "Producto no encontrado"});
        }
    }else{
        res.send("No hay productos");
    } 
})



module.exports = router;