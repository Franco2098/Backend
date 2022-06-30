const knex = require("../db")

class contenedor {
    constructor (tabla) {
        this.tabla = tabla
    }

    async save (obj){
        try {
            await knex(this.tabla)
                .insert(obj)
        }        
        catch(err){
            console.log("error")
            }
    }

    async getById(id, res) {
            knex.from(this.tabla).select("*").where({id: id})
            .then((json)=> {
                res.send(json)
            })
            .catch((err) => {
                console.log(err);
            });
        }

    async getAll(res){
        knex.from(this.tabla).select("*")
        .then((json)=> {
            res.send(json)
        })
        .catch((err) => {
            console.log(err);
        });
        }
    
    async deleteById(id, res){
        knex(this.tabla)
        .where({id: id})
        .del()
        .then(()=> {
            res.send({ message: "User Deleted"})
        })
        .catch((err) => {
            console.log(err);
        });
    }

    async deleteAll(res){
        knex(this.tabla)
        .del()
        .then(()=> {
            res.send({ message: "All Users Deleted"})
        })
        .catch((err) => {
            console.log(err);
        });
    }

}


module.exports = contenedor 