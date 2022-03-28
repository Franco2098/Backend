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
                let data = await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"})
                if (data){
                    this.arrayVacio = JSON.parse(data)
                    this.arrayVacio.push(obj)
                    await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                    try {
                        console.log(id-1)
                    }catch (err){
                        console.log("error")
                    }
                }else{
                    this.arrayVacio.push(obj)
                    await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                    try {
                        console.log(id-1)
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
                
                let data = JSON.parse(await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"}))
                if (data) {
                    let productoId = data.find(x => {return x.id == id})
                    if (productoId) {
                        console.log(productoId)
                    }else{
                        console.log("Null")
                    }
                }
                
            }
            catch(err){
                console.log("Error")
            }
        }
         
    

    async getAll(){
            try {
                let array = JSON.parse(await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"}))
                console.log(array) 
            }
            catch(err){
                console.log("Error")
            }
        }
        
    

    async deleteById(id){
        try {        
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
        }
        catch(err){
            console.log("Error")
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(`./${this.nombreArchivo}`, vacio, {encoding:"utf-8"})
            console.log("Archivo Vaciado") 
        }
        catch(err){
            console.log("Error")
        }
    }
    
}




const contenedor1 = new contenedor("productos.json")

contenedor1.save(producto)
//contenedor1.getById(3)
//contenedor1.getAll()
//contenedor1.deleteById(3)
//contenedor1.deleteAll()