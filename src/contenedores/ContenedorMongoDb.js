import mongoose from 'mongoose'
import config from '../config.js'
//import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async save(obj) {
        try {
            obj = {...obj, timeStamp: Date.now()} 
            let doc = await this.coleccion.create(obj);
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async getById(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id })
            if (docs.length == 0) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                return docs
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll() {
        try {
            let docs = await this.coleccion.find()
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async actualizar(nuevoElem) {
        try {
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem)
            if (n == 0 || nModified == 0) {
                throw new Error('Error al actualizar: no encontrado')
            } else {
                return nuevoElem
            }
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default ContenedorMongoDb