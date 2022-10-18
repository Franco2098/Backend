import {nom, mail, desloguear, transporter} from "../services/operaciones.js"
import {actualizar, mostrar, mostrarCarrito, guardar, borrar, borrarTodos, mostrarId, buscarId} from "../persistencia/operaciones.js"


export const registro1 = async(req, res) => {
    res.render("registro")
    }

export const login1 = async(req, res) => {
        res.render("login")
        }
    
export const formulario = async(req, res) => {
    res.render("formulario",{name:nom})
    }

export const principal = async(req, res) => {
    const arrayPrinc = await mostrar()
    const arrayCarrito = await mostrarCarrito()
    const array = arrayCarrito.filter(x => x.email == mail)
    res.render("principal",{data:arrayPrinc, name:nom, dataCar: array.length})
    }

export const carrito = async(req, res) => {
    const arrayCarrito = await mostrarCarrito()
    const array = arrayCarrito.filter(x => x.email == mail)
    res.render("carrito",{data:array, name:nom, dataCar: array.length})
    }

export const compra = async(req, res) => {
    const arrayCarrito = await mostrarCarrito()
    const array = arrayCarrito.filter(x => x.email == mail)
    transporter.sendMail({
        from: 'Servidor Node.js',
        to: "juanjoshua1990@gmail.com",
        subject: `Nuevo pedido de ${nom} ${mail}`,
        html: `${array}`
    })
    res.render("compra",{name:nom})
    }

export const logout = async(req, res) => {
    res.render("logout")
    }
    
export const errorRegistro = async(req, res) => {
    res.render("errorRegistro")
    }
    
export const errorLogin = async(req, res) => {
    res.render("errorLogin")
    }

export const guardar1 = async(req, res) => {
    guardar(req,res)
        }

export const actualizar1 = async(req, res) => {
    actualizar(req,res)
    }

export const logout1 = async(req, res) => {
    await desloguear(req,res)
    }

export const borrar1 = async(req, res) => {
    borrar(req,res)
    }

export const borrarTodos1 = async(req, res) => {
    borrarTodos(req,res)
    }

export const mostrarId1 = async(req, res) => {
    mostrarId(req,res)
    }

export const buscarId1 = async(req, res) => {
    buscarId(req,res)
    }
