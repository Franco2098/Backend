import { json } from "express";
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

    async getById(id, res) {
            this.knex.from(this.tabla).select("*").where({id: id})
            .then((json)=> {
                res.send(json)
            })
            .catch((err) => {
                console.log(err);
            });
        }

    async getAll(res){
        this.knex.from(this.tabla).select("*")
        .then((json)=> {
            res.send(json)
        })
        .catch((err) => {
            console.log(err);
        });
        }

    async update(req,res){
        this.knex.from(this.tabla).select("*")
        .where({id: req.params.id})
        .update({name: req.body.name, price: req.body.price})
        .then((json)=> {
            res.send(json)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    async deleteById(id, res){
        this.knex(this.tabla)
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
        this.knex(this.tabla)
        .del()
        .then(()=> {
            res.send({ message: "All Users Deleted"})
        })
        .catch((err) => {
            console.log(err);
        });
    }

}


export default contenedor

