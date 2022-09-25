import Factory from "../persistencia/contenedores/factory.js"
import {faker} from "@faker-js/faker"

const productos = Factory.crearDaoProductos()

export async function mostrar(ctx){
   const pro = productos.getAll()
   ctx.body = {
        productos : await pro
   }
    
}

export async function mostrarId(ctx){
    const proId =  productos.getById(parseInt(ctx.params.id))
    ctx.body = {
        productos : await proId
   }
    
}

export async function guardar(ctx){
    productos.save(ctx.request.body)
    ctx.body = {
        productoNuevo : "Producto añadido"
    }
}

export async function guardarFaker(ctx){
    for(let i=0; i < 5; i++) {
        const obj = { name: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.business()
        }
        productos.save(obj)
        ctx.body = {
            productoNuevo : "Producto añadido"
        }
    }
}

export async function actualizar(ctx){
    productos.update(ctx)
    ctx.body = {
        productoActualizado : "Producto actualizado"
    }
}

export async function borrar(ctx){
    productos.deleteById(ctx.params.id)
    ctx.body = {
        productoBorrado : "Producto borrado"
    }
}

export async function borrarTodos(ctx){
    productos.deleteAll()
    ctx.body = {
        productos : "Productos borrados"
    }
}


