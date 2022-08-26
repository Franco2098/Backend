import contenedor from "./contenedores/contenedorKnex.js";
import config from "./config.js"
import {faker} from "@faker-js/faker"


const contenedor1 = new contenedor(config.mariaDb, "productos")

export async function mostrar(res){
    contenedor1.getAll(res)
}

export async function mostrarId(req,res){
    if(!isNaN(req.params.id)){
        contenedor1.getById(req.params.id, res)
    }else{
        res.send("Parametro ingresado incorrecto")
    }
}

export async function guardar(req,res){
    contenedor1.save(req.body).then( ()=> res.send("Producto añadido"))
}

export async function guardarFaker(req,res){
    for(let i=0; i < 5; i++) {
        const obj = { name: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.business()
        }
        contenedor1.save(obj)
        res.send("Productos añadidos")
    }
}

export async function actualizar(req,res){
    contenedor1.update(req,res).then( ()=> res.send("Producto actualizado"))
}

export async function borrar(req,res){
    if(!isNaN(req.params.id)){
        contenedor1.deleteById(req.params.id, res)
    }else{
        res.send("Parametro ingresado incorrecto")
    }
}

export async function borrarTodos(req,res){
    contenedor1.deleteAll(res)
}

