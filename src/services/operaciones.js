import passport from "passport"

import passportLocal from "passport-local"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const LocalStrategy = passportLocal.Strategy
import Usuarios from "../persistencia/user.js"

export let nom = ""
export let mail = ""

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: "juanjoshua1990@gmail.com",
        pass: process.env.MAIL
    }
});

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

function comparePassword(inputPass, hashedPass) {
    return bcrypt.compareSync(inputPass, hashedPass);
  }

  passport.use("registro", new LocalStrategy({
    usernameField:"email",
    passwordField:"contraseña",
    passReqToCallback: true
},async(req, email, contraseña, done)=>{
    const usuarioBd = await Usuarios.findOne({email})
    nom = req.body.nombre
    mail = email
    if(usuarioBd || contraseña!==req.body.repetirContraseña){
        return done(null,false)
    }
    const usuarioNuevo = new Usuarios()
    usuarioNuevo.nombre = req.body.nombre
    usuarioNuevo.contraseña = hashPassword(contraseña)
    usuarioNuevo.email = email
    usuarioNuevo.edad = req.body.edad
    usuarioNuevo.tel = req.body.tel
    usuarioNuevo.direccion = req.body.direccion
    await usuarioNuevo.save()

    transporter.sendMail({
        from: 'Servidor Node.js',
        to: "juanjoshua1990@gmail.com",
        subject: 'Nuevo registro',
        html: `${usuarioNuevo}`
    })

    done(null,usuarioNuevo)

}
))

passport.use("login", new LocalStrategy({
    usernameField:"email",
    passwordField:"contraseña",
    passReqToCallback: true
},async(req, email, contraseña, done)=>{
    const usuarioBdNombre = await Usuarios.findOne({email})
    const arrayBD = []
    arrayBD.push(usuarioBdNombre)
    const usuarioBdContraseña = arrayBD.map((el)=> (el.contraseña))
    const comp = comparePassword(contraseña, usuarioBdContraseña.toString())
    if(!usuarioBdNombre || comp == false ){
        return done(null,false)
    }
    nom = usuarioBdNombre.nombre
    mail = email
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