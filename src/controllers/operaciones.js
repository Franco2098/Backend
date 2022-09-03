import {nom, info, desloguear} from "../services/operaciones.js"
import {actualizar, borrar, borrarTodos, guardar, guardarFaker, mostrar, mostrarId} from "../persistencia/operaciones.js"



export const registro1 = async(req, res) => {
    res.render("registro")
    }

export const login1 = async(req, res) => {
        res.render("login")
        }
    
export const formulario = async(req, res) => {
    res.render("formulario",{name:nom})
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

export const mostrar1 = async(req, res) => {
    await mostrar(res)
    }
    
export const mostrarId1 = async(req, res) => {
    mostrarId(req,res)
    }

export const info1 = async (req,res) => {
    let inf = await info()
    res.send(inf)
}

export const infoZip = async (req,res) => {
    let inf = await info()
    res.send(inf)
}

export const guardar1 = async(req, res) => {
    guardar(req,res)
    }

export const guardarFaker1 = async(req, res) => {
    guardarFaker(req,res)
    }

export const actualizar1 = async(req, res) => {
    actualizar(req,res)
    }

export const borrar1 = async(req, res) => {
    borrar(req,res)
    }

export const borrarTodos1 = async(req, res) => {
    borrarTodos(req,res)
    }

export const logout1 = async(req, res) => {
    await desloguear(req,res)
    }