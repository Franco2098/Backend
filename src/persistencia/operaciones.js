import Factory from "../persistencia/contenedores/factory.js"
import {faker} from "@faker-js/faker"


const productos = Factory.crearDaoProductos()


export async function mostrar(res){
    productos.getAll().then( (obj)=> res.send(obj))
    
}

export async function mostrarId(req,res){
        productos.getById(req.params.id).then( (obj)=> res.send(obj))
    
}

export async function guardar(req,res){
    productos.save(req.body).then( ()=> res.send("Producto añadido"))
}

export async function guardarFaker(req,res){
    for(let i=0; i < 5; i++) {
        const obj = { name: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.business()
        }
        productos.save(obj)
        res.send("Productos añadidos")
    }
}

export async function actualizar(req,res){
    productos.update(req,res).then( ()=> res.send("Producto actualizado"))
}

export async function borrar(req,res){
    productos.deleteById(req.params.id).then( ()=> res.send("Producto eliminado"))
    
}

export async function borrarTodos(req,res){
    productos.deleteAll().then( ()=> res.send("Productos eliminados"))
}

