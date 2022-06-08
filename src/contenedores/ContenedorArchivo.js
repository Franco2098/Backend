import { promises as fs } from 'fs'
import config from '../config.js'

let id = 1
let vacio = ""
let archivo = ""

class contenedor {
    constructor (nombreArchivo) {
    this.nombreArchivo = `${config.fileSystem.path}/${nombreArchivo}`;
    this.arrayVacio = []
    }

    async save (obj){
            try {
                
                //if (fs.existsSync(this.nombreArchivo)){
                    console.log(this.nombreArchivo)
                    let data = await fs.promises.readFile(this.nombreArchivo, {encoding:"utf-8"})
                    if (data) {
                        this.arrayVacio = JSON.parse(data)
                        obj = {...obj, timeStamp: Date.now()}                     
                        this.arrayVacio.push(obj)
                        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                    }else{
                        obj = {...obj, timeStamp: Date.now()}                     
                        this.arrayVacio.push(obj)
                        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                    }       
                /*}else{
                        obj = {...obj, timeStamp: Date.now()}                     
                        this.arrayVacio.push(obj)
                        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                    } */
            }catch (err) {
                console.log("error")
            }                        
    }


    async getById(id) {
            try {
                if (fs.existsSync(this.nombreArchivo)){
                    let data = JSON.parse(await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"}))
                    let productoId = data.find(x => {return x.id == id})
                    if (productoId) {
                        return productoId
                    }else{
                        productoId = {error: "Producto no encontrado"}
                        return productoId
                    } 
                }else{
                    archivo = ("El arhivo no existe, asegurate de primero crearlo con el metodo save")
                    return archivo
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
                    archivo = ("El arhivo no existe, asegurate de primero crearlo con el metodo save")
                    return archivo
                } 
            }
            catch(err){
                console.log("Error")
            }
        }

        async actualizar(obj) {
            let data = JSON.parse(fs.readFileSync(`./${this.nombreArchivo}`, {encoding:"utf-8"}))
            let nuevaData = data.filter(x => {return x.id != obj.id})
            nuevaData.push(obj)
            nuevaData.sort((a, b) => a.id - b.id);
            fs.writeFileSync(`./${this.nombreArchivo}`, (JSON.stringify(nuevaData,null,2)), {encoding:"utf-8"})
        }

    async deleteById(id){
        try {
            if (fs.existsSync(this.nombreArchivo)){        
                let data = JSON.parse(await fs.promises.readFile(`./${this.nombreArchivo}`, {encoding:"utf-8"}))
                let nuevaData = data.filter(x => {return x.id != id})
                await fs.promises.writeFile(`./${this.nombreArchivo}`, (JSON.stringify(nuevaData,null,2)), {encoding:"utf-8"})
                console.log(data.length)
                console.log(nuevaData.length)
                if (data.length != nuevaData.length) {
                        let producto = ("Producto eliminado")
                        return producto
                    }else{
                        let producto = ("Producto no encontrado")
                        return producto
                    }
            }else{
                archivo = ("El arhivo no existe, asegurate de primero crearlo con el metodo save")
                return archivo
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
                archivo = ("Archivo Vaciado")
                return archivo
            }else{
                archivo = ("El arhivo no existe, asegurate de primero crearlo con el metodo save")
                return archivo
            } 
        }
        catch(err){
            console.log("Error")
        }
    }

}


export default contenedor