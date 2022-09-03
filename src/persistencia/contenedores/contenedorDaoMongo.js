
class contenedorMongoDb {
    constructor (tabla) {
        this.tabla = tabla
    }

    async save (obj){
        try {
        const nuevo = new this.tabla(obj)
        nuevo.save()   
        }        
        catch(err){
            console.log("error")
            }
    }

    async getById(id) {
        try {
            const array = await this.tabla.find({})
            const objeto = array.filter((el)=> (el.id == id ))
            return objeto
            }        
            catch(err){
                console.log("error")
            }
        }

    async getAll(){
        try {
            const objeto = await this.tabla.find({})
            return objeto
            }        
            catch(err){
                console.log("error")
            }
        }

    async update(id, obj){
        try {
            const objeto = await this.tabla.replaceOne({ '_id': id }, obj)
            return (objeto)
            }        
            catch(err){
                console.log("error")
            }
    }
    
    async deleteById(id){
        try {
            await this.tabla.deleteOne({ '_id': id })
            }        
            catch(err){
                console.log("error")
            }
    }

    async deleteAll(){
        try {
            await this.tabla.deleteMany({})
            }        
            catch(err){
                console.log("error")
            }
    }

}


export default contenedorMongoDb