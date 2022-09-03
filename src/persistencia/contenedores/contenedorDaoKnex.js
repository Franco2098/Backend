import knex from "knex";

class contenedor {
    constructor (config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async save (obj){
        try {
            await this.knex(this.tabla)
                .insert(obj)
        }        
        catch(err){
            console.log("error")
            }
    }

    async getById(id) {
            return this.knex.from(this.tabla).select("*").where({id: id})
            
        }

    async getAll(){
        return this.knex.from(this.tabla).select("*")
        }

    async update(req){
        this.knex.from(this.tabla).select("*")
        .where({id: req.params.id})
        .update({name: req.body.name, price: req.body.price})
        
    }
    
    async deleteById(id){
        this.knex(this.tabla)
        .where({id: id})
        .del()
        
    }

    async deleteAll(){
        this.knex(this.tabla)
        .del()
    }

}


export default contenedor

