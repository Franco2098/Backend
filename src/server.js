import express from 'express'
const { Router } = express

import {
    productosDao as productosApi,
    carritosDao as carritosApi
} from './daos/index.js'

//------------------------------------------------------------------------
// instancio servidor

const app = express()

//--------------------------------------------
// permisos de administrador

const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const productos = await productosApi.getAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await productosApi.getById(req.params.id))
})

productosRouter.post('/', soloAdmins, async (req, res) => {
    res.json(await productosApi.save(req.body))
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.actualizar(req.body))
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.deleteById(req.params.id))
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
    res.json((await carritosApi.getAll()).map(c => c.id))
})

carritosRouter.post('/', async (req, res) => {
    res.json(await carritosApi.save())
})

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await carritosApi.deleteById(req.params.id))
})

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.getById(req.params.id)
    res.json(carrito.productos)
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.getById(req.params.id)
    const producto = await productosApi.getById(req.body.id)
    carrito.productos.push(producto)
    await carritosApi.actualizar(carrito)
    res.end()
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const carrito = await carritosApi.getById(req.params.id)
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        carrito.productos.splice(index, 1)
        await carritosApi.actualizar(carrito)
    }
    res.end()
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

export default app