const express = require("express");
const {faker} = require("@faker-js/faker")
const session = require("express-session");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const numCPUs = require("os").cpus().length
const compression = require("compression")

const Usuarios = require("../user.js")

const logger = require("../logger.js")


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
    logger.info("Esta url existe")
    res.render("registro")
 })

router.get('/login', (req, res) => {
    logger.info("Esta url existe")
    res.render("login")
 })

router.get('/formulario',(req, res) => {
    logger.info("Esta url existe")
    res.render("formulario", {name:nom})
 })

router.get('/logout', (req, res) => {
    logger.info("Esta url existe")
    res.render("logout")
 })

router.get('/productos', (req, res) => {
    logger.info("Esta url existe")
    contenedor1.getAll(res)
 })

 router.get('/productos/:id', (req, res) => {
    logger.info("Esta url existe")
    if(!isNaN(req.params.id)){
        logger.info("Parametro ingresado correcto")
        contenedor1.getById(req.params.id, res)
    }else{
        logger.error("Parametro ingresado incorrecto")
        res.send("Parametro ingresado incorrecto")
    }
})

router.get('/errorRegistro', (req, res) => {
    logger.info("Esta url existe")
    res.render("error2")
 })

router.get('/errorLogin', (req, res) => {
    logger.info("Esta url existe")
    res.render("error")
 })

 router.get("/logout_", (req,res) => {
    logger.info("Esta url existe")
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
    logger.info("Esta url existe")
    contenedor1.save(req.body).then( ()=> res.send("Producto añadido"))
})

router.post("/productos-test", (req,res)=> {
    logger.info("Esta url existe")
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
    logger.info("Esta url existe")
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
    logger.info("Esta url existe")
    if(!isNaN(req.params.id)){
        logger.info("Parametro ingresado correcto")
        contenedor1.deleteById(req.params.id, res)
    }else{
        logger.error("Parametro ingresado incorrecto")
        res.send("Parametro ingresado incorrecto")
    }
})

router.delete("/productos", (req,res)=> {
    logger.info("Esta url existe")
    contenedor1.deleteAll(res)
})

router.get("/info", (req,res)=> {
    logger.info("Esta url existe")
    const info = {ArgumentosEntradas: process.argv, SistemaOperativo: process.platform, VersionNode: process.version, Memoria: process.memoryUsage(), Path: process.execPath, ProcessId: process.pid, CarpetaProyecto: process.cwd(),
                  Procesadores: numCPUs
    }

    //Prueba con console log
    //console.log(info)
    res.send(info)
})

router.get("/infoZip", compression(), (req,res)=> {
    logger.info("Esta url existe")
    const info = {ArgumentosEntradas: process.argv, SistemaOperativo: process.platform, VersionNode: process.version, Memoria: process.memoryUsage(), Path: process.execPath, ProcessId: process.pid, CarpetaProyecto: process.cwd(),
                  Procesadores: numCPUs
    }
    res.send(info)
})



module.exports = router;
