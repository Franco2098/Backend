import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('productos', {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            codigo: { type: String, required: true },
            url: { type: String, required: true },
            precio: { type: String, required: true },
            stock: { type: String, required: true },
            timeStamp: { type: Number, required: true },
        })
    }
}

export default ProductosDaoMongoDb
