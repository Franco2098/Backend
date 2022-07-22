const express = require("express");
const {faker} = require("@faker-js/faker")
const session = require("express-session");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const Usuarios = require("../user.js")

let nom = ""

passport.use("registro", new LocalStrategy({
    usernameField:"nombre",
    passwordField:"contraseña",
    passReqToCallback: true
},async(req, nombre, constraseña, done)=>{
    const usuarioBd = await Usuarios.findOne({nombre})
    nom = usuarioBd.nombre
    if(usuarioBd){
        return done(null,false)
    }
    const usuarioNuevo = new Usuarios()
    usuarioNuevo.nombre = nombre
    usuarioNuevo.constraseña = constraseña
    await usuarioNuevo.save()
    done(null,usuarioNuevo)
}
))

passport.use("login", new LocalStrategy({
    usernameField:"nombre",
    passwordField:"contraseña",
    passReqToCallback: true
},async(req, nombre, constraseña, done)=>{
    const usuarioBd = await Usuarios.findOne({nombre})
    if(!usuarioBd){
        return done(null,false)
    }
    nom = usuarioBd.nombre
    done(null,usuarioBd)
}
))

passport.serializeUser((usuario,done)=>{
    done(null,usuario.id)
})

passport.deserializeUser(async(id,done)=>{
    const usuario = await Usuarios.findById(id)
    done(null,usuario)
})


const { Router } = express;

let router = new Router();

const knex = require("../db")

const contenedor = require("./metodos.js");
const { json } = require("express");

const contenedor1 = new contenedor("productos")

router.get('/registro', (req, res) => {
    res.render("registro")
 })

router.get('/login', (req, res) => {
    res.render("login")
 })

router.get('/formulario',(req, res) => {
    res.render("formulario", {name:nom})
 })

router.get('/logout', (req, res) => {
    res.render("logout")
 })

router.get('/productos', (req, res) => {
    contenedor1.getAll(res)
 })

 router.get('/productos/:id', (req, res) => {
    contenedor1.getById(req.params.id, res)
})

router.get('/errorRegistro', (req, res) => {
    res.render("error2")
 })

router.get('/errorLogin', (req, res) => {
    res.render("error")
 })

 router.get("/logout_", (req,res) => {
    req.session.destroy(err => {
        if (err){
       res.json({status: "Logout ERROR", body:err})
    }
    setTimeout(function(){
        res.render("login");
    }, 2000);
    })
})

router.post("/productos", (req, res) => {
    contenedor1.save(req.body).then( ()=> res.send("Producto añadido"))
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

router.post("/registro", passport.authenticate("registro", {
    failureRedirect: "/errorRegistro",
    successRedirect: "/formulario"
}))

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/errorLogin",
    successRedirect: "/formulario"
}))

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

router.get("/info", (req,res)=> {
    const info = {ArgumentosEntradas: process.argv, SistemaOperativo: process.platform, VersionNode: process.version, Memoria: process.memoryUsage(), Path: process.execPath, ProcessId: process.pid, CarpetaProyecto: process.cwd()  }
    res.send(info)
})

module.exports = router;
