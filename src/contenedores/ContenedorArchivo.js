import { promises as fs } from 'fs'
import config from '../config.js'

let id = 1
let vacio = ""


class contenedor {
    constructor (nombreArchivo) {
    this.nombreArchivo = `${config.fileSystem.path}/${nombreArchivo}`;
    this.arrayVacio = []
    }

    async save (obj){
            try {            
                let data = await fs.readFile(this.nombreArchivo, {encoding:"utf-8"})
                if (data) {
                    this.arrayVacio = JSON.parse(data)
                    obj = {...obj, timeStamp: Date.now()}                     
                    this.arrayVacio.push(obj)
                    await fs.writeFile(this.nombreArchivo, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                }else{
                    obj = {...obj, timeStamp: Date.now()}                     
                    this.arrayVacio.push(obj)
                    await fs.writeFile(this.nombreArchivo, JSON.stringify(this.arrayVacio.map((el) => ({...el, id: id++})),null,2), {encoding:"utf-8"})
                }   
            }catch (err) {
                console.log("error")
            }                        
    }


    async getById(id) {
            try {
                let data = JSON.parse(await fs.readFile(this.nombreArchivo, {encoding:"utf-8"}))
                let productoId = data.find(x => {return x.id == id})
                if (productoId) {
                    return productoId
                }else{
                    productoId = {error: "Producto no encontrado"}
                    return productoId
                } 
            }
            catch(err){
                console.log("Error")
            }
        }



    async getAll(){
            try {
                let array = JSON.parse(await fs.readFile(this.nombreArchivo, {encoding:"utf-8"}))
                return array
            }
            catch(err){
                console.log("Error")
            }
        }

    async actualizar(obj) {
            try {
                let data = JSON.parse(await fs.readFile(this.nombreArchivo, {encoding:"utf-8"}))
                let nuevaData = data.filter(x => {return x.id != obj.id})
                nuevaData.push(obj)
                nuevaData.sort((a, b) => a.id - b.id);
                await fs.writeFile(this.nombreArchivo, (JSON.stringify(nuevaData,null,2)), {encoding:"utf-8"})
            }catch(err){
                    console.log("Error")
                }
        }

    async deleteById(id){
        try {       
            let data = JSON.parse(await fs.readFile(this.nombreArchivo, {encoding:"utf-8"}))
            let nuevaData = data.filter(x => {return x.id != id})
            await fs.writeFile(this.nombreArchivo, (JSON.stringify(nuevaData,null,2)), {encoding:"utf-8"})
            if (data.length != nuevaData.length) {
                let producto = ("Producto eliminado")
                return producto
            }else{
                let producto = ("Producto no encontrado")
                return producto
            }   
        }
        catch(err){
            console.log("Error")
        }
    }

    async deleteAll(){
        try {
            await fs.writeFile(this.nombreArchivo, vacio, {encoding:"utf-8"})
            archivo = ("Archivo Vaciado")
            return archivo
        }
        catch(err){
            console.log("Error")
        }
    }

}


export default contenedor