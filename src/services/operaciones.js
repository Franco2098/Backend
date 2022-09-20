import passport from "passport"

import passportLocal from "passport-local"
import {cpus} from "os"

const numCPUs = cpus().length
const LocalStrategy = passportLocal.Strategy
import Usuarios from "../persistencia/user.js"

export let nom = ""

passport.use("registro", new LocalStrategy({
    usernameField:"nombre",
    passwordField:"contraseña",
    passReqToCallback: true
},async(req, nombre, constraseña, done)=>{
    const usuarioBd = await Usuarios.findOne({nombre})
    nom = nombre
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
    nom = nombre
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


export async function info(){
    let informacion = {ArgumentosEntradas: process.argv, SistemaOperativo: process.platform, VersionNode: process.version, Memoria: process.memoryUsage(), Path: process.execPath, ProcessId: process.pid, CarpetaProyecto: process.cwd(),
        Procesadores: numCPUs}
        return informacion
}


export async function desloguear(req,res){
    req.session.destroy(err => {
        if (err){
       res.json({status: "Logout ERROR", body:err})
    }
    setTimeout(function(){
        res.render("login");
    }, 2000);
    })
}