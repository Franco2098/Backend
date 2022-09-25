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

export const mostrar1 = async (ctx) => {
    await mostrar(ctx)
    }
    
export const mostrarId1 = async(ctx) => {
    await mostrarId(ctx)
    }

export const info1 = async (ctx) => {
    let inf = await info()
    ctx.body = {
        inf
    }
}

export const infoZip = async (ctx) => {
    let inf = await info()
    ctx.body = {
        inf
    }
}

export const guardar1 = async(ctx) => {
    await guardar(ctx)
    }

export const guardarFaker1 = async(ctx) => {
    await guardarFaker(ctx)
    }

export const actualizar1 = async(ctx) => {
    await actualizar(ctx)
    }

export const borrar1 = async(ctx) => {
    await borrar(ctx)
    }

export const borrarTodos1 = async(ctx) => {
    await borrarTodos(ctx)
    }

export const logout1 = async(req, res) => {
    await desloguear(req,res)
    }