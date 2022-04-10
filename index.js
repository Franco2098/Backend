const fs = require("fs")

let producto = {marca: "Samsung", modelo: "S22"}
let id = 1
let vacio = ""




class contenedor {
    constructor (nombreArchivo) {
    this.nombreArchivo = nombreArchivo
    this.arrayVacio = []
    }

    async save (obj){
            try {
                if (fs.existsSync(this.nombreArchivo)){
                    let data = await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"})
                    if (data){
                        this.arrayVacio = JSON.parse(data)
                        this.arrayVacio.push(obj)
                        await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                            try {                              
                            }catch (err){
                            console.log("error")
                        }
                    }else{
                        this.arrayVacio.push(obj)
                        await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                        try {                           
                        }catch (err){
                            console.log("error")
                        }
                    }
                }else{
                    await fs.promises.writeFile(`./${this.nombreArchivo}`, vacio, {encoding:"utf-8"})
                            try {
                            }catch (err){
                            console.log("error")
                            }
                } 
            }catch (err) {
                console.log("error")
            }                        
    }

    
    async getById(id) {
            try {
                if (fs.existsSync(this.nombreArchivo)){
                    let data = JSON.parse(await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"}))
                    if (data) {
                        let productoId = data.find(x => {return x.id == id})
                        if (productoId) {
                            return productoId
                        }else{
                            console.log("Null")
                        }
                    }
                }else{
                    console.log("El arhivo no existe, asegurate de primero crearlo con el metodo save")
                }
            }
            catch(err){
                console.log("Error")
            }
        }
         
    

    async getAll(){
            try {
                if (fs.existsSync(this.nombreArchivo)){
                    let array = JSON.parse(await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"}))
                    return array
                }else{
                    console.log("El arhivo no existe, asegurate de primero crearlo con el metodo save")
                } 
            }
            catch(err){
                console.log("Error")
            }
        }
        
    

    async deleteById(id){
        try {
            if (fs.existsSync(this.nombreArchivo)){        
                let data = JSON.parse(await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"}))
                if (data) {
                    let nuevaData = data.filter(x => {return x.id != id})
                    await fs.promises.writeFile(`./${this.nombreArchivo}`, (JSON.stringify(nuevaData,null,2)), {encoding:"utf-8"})
                        try {
                            console.log("Producto eliminado")
                        }catch (err){
                            console.log("error")
                        }
            }
            }else{
                console.log("El arhivo no existe, asegurate de primero crearlo con el metodo save")
            }   
        }
        catch(err){
            console.log("Error")
        }
    }

    async deleteAll(){
        try {
            if (fs.existsSync(this.nombreArchivo)){
                await fs.promises.writeFile(`./${this.nombreArchivo}`, vacio, {encoding:"utf-8"})
                console.log("Archivo Vaciado")
            }else{
                console.log("El arhivo no existe, asegurate de primero crearlo con el metodo save")
            } 
        }
        catch(err){
            console.log("Error")
        }
    }
    
}

//contenedor1.save(producto)
//contenedor1.getById(3)
//contenedor1.getAll()
//contenedor1.deleteById(3)
//contenedor1.deleteAll()

const contenedor1 = new contenedor("productos.txt")

const express = require("express")
const app = express()

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error `))

app.get('/productos', (req, res) => {
    contenedor1.getAll().then(pro => res.send(pro))
 })

 app.get('/productoRandom', (req, res) => {
    contenedor1.getAll().then(pro => { 
    let idRandom = Math.ceil(Math.random() * pro.length)
    contenedor1.getById(idRandom).then(pro1 => res.send(pro1))
    })
 })

 