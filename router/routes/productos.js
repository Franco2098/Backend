const express = require("express");
const {faker} = require("@faker-js/faker")
const session = require("express-session");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const numCPUs = require("os").cpus().length
const compression = require("compression")
const Usuarios = require("../user.js")
const Producto = require("./productosMongo.js")
const Carrito = require("./carritoMongo.js")
const logger = require("../logger.js")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "madisen.nolan97@ethereal.email",
        pass: 'hzQ1uhFbdVmCjFFzSm'
    }
});
  
let nom = ""

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

function comparePassword(inputPass, hashedPass) {
    return bcrypt.compareSync(inputPass, hashedPass);
  }

passport.use("registro", new LocalStrategy({
    usernameField:"nombre",
    passwordField:"contraseña",
    passReqToCallback: true
},async(req, nombre, contraseña, done)=>{
    const usuarioBd = await Usuarios.findOne({nombre})
    nom = nombre
    if(usuarioBd){
        return done(null,false)
    }
    const usuarioNuevo = new Usuarios()
    usuarioNuevo.nombre = nombre
    usuarioNuevo.contraseña = hashPassword(contraseña)
    usuarioNuevo.email = req.body.email
    usuarioNuevo.edad = req.body.edad
    usuarioNuevo.tel = req.body.tel
    usuarioNuevo.direccion = req.body.direccion
    usuarioNuevo.foto = req.body.foto
    await usuarioNuevo.save()

    transporter.sendMail({
        from: 'Servidor Node.js',
        to: "madisen.nolan97@ethereal.email",
        subject: 'Nuevo registro',
        html: `${usuarioNuevo}`
    })

    done(null,usuarioNuevo)

}
))

passport.use("login", new LocalStrategy({
    usernameField:"nombre",
    passwordField:"contraseña",
    passReqToCallback: true
},async(req, nombre, contraseña, done)=>{
    const usuarioBdNombre = await Usuarios.findOne({nombre})
    const arrayBD = await Usuarios.find({})
    const usuarioBdContraseña = arrayBD.map((el)=> (el.contraseña))
    const comp = comparePassword(contraseña, usuarioBdContraseña.toString())
    if(!usuarioBdNombre || comp == false ){
        return done(null,false)
    }
    nom = usuarioBdNombre.nombre
    done(null,usuarioBdNombre)
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

const { json } = require("express");
const { showHelpOnFail } = require("yargs");


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
    if(nom == ""){
        res.render("login")
    }else{
        res.render("formulario", {name:nom})
    }
 })

router.get('/logout', (req, res) => {
    logger.info("Esta url existe")
    res.render("logout")
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


router.post("/registro", passport.authenticate("registro", {
    failureRedirect: "/errorRegistro",
    successRedirect: "/principal"
}))

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/errorLogin",
    successRedirect: "/principal"
}))

router.put("/productos/:id", (req,res)=> {
    logger.info("Esta url existe")
    
})


router.delete("/productos/:id", (req,res)=> {
    logger.info("Esta url existe")
    if(!isNaN(req.params.id)){
        logger.info("Parametro ingresado correcto")
        
    }else{
        logger.error("Parametro ingresado incorrecto")
        res.send("Parametro ingresado incorrecto")
    }
})

router.delete("/productos", (req,res)=> {
    logger.info("Esta url existe")
    
})

router.get("/info", (req,res)=> {
    logger.info("Esta url existe")
    const info = {ArgumentosEntradas: process.argv, SistemaOperativo: process.platform, VersionNode: process.version, Memoria: process.memoryUsage(), Path: process.execPath, ProcessId: process.pid, CarpetaProyecto: process.cwd(),
                  Procesadores: numCPUs
    }

    //Prueba con console log
    console.log(info)
    res.send(info)
})

router.get("/infoZip", compression(), (req,res)=> {
    logger.info("Esta url existe")
    const info = {ArgumentosEntradas: process.argv, SistemaOperativo: process.platform, VersionNode: process.version, Memoria: process.memoryUsage(), Path: process.execPath, ProcessId: process.pid, CarpetaProyecto: process.cwd(),
                  Procesadores: numCPUs
    }
    res.send(info)
})

router.get('/principal', async(req, res) => {
    const pro = await Producto.find({})
    res.render("principal", {data:pro, name:nom})

 })

 router.post("/productos", (req, res) => {
    const nuevoProduct = req.body
    const nuevo = new Producto(nuevoProduct)
    nuevo.save()
    res.send("Producto añadido")
})
 
router.get('/carrito', async(req, res) => {
    const carr = await Carrito.find({})
    res.render("carrito", {data:carr, name:nom})

 })

router.post("/carrito", (req, res) => {
    const nuevoCarrito = req.body
    const nuevo = new Carrito(nuevoCarrito)
    nuevo.save()
    res.send("Producto añadido al carrito")
})

router.get('/compra', async(req, res) => {
    const arrayBD = await Usuarios.find({})
    const usuarioBd = arrayBD.filter((el)=> (el.nombre == nom ))
    const emailBD = usuarioBd.map((el)=> (el.email))
    const carritoBD =  await Carrito.find({})
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "	madisen.nolan97@ethereal.email",
        pass: 'hzQ1uhFbdVmCjFFzSm'
    }
});

transporter.sendMail({
    from: 'Servidor Node.js',
    to: "madisen.nolan97@ethereal.email",
    subject: `Nuevo pedido de ${nom} ${emailBD}`,
    html: `${carritoBD}`
})
    res.send("Mail enviado")

 })

module.exports = nom;
module.exports = router;
