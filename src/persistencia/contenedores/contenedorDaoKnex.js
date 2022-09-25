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

    async update(ctx){
        this.knex.from(this.tabla).select("*")
        .where({id: ctx.params.id})
        .update({name: ctx.request.body.name, price: ctx.request.body.price})
        
    }
    
    async deleteById(id){
        return this.knex.from(this.tabla).select("*")
        .where({id: id})
        .del()
        
    }

    async deleteAll(){
        return this.knex.from(this.tabla)
        .del()
    }

}


export default contenedor

