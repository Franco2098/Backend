class contenedor {
    constructor () {
    
    }

    async save (obj, knex){
            let objNew = {
                name: obj.name,
                price: obj.price,
                thumbnail: obj.thumbnail
            };

            knex("productos")
                .insert(objNew)
                .then(()=> {
                    console.log("Register ok");
                })
                .catch((err) => {
                    console.log(err);
                });
            }


    async getById(id, knex, res) {
            knex.from("productos").select("*").where({id: id})
            .then((json)=> {
                res.send(json)
            })
            .catch((err) => {
                console.log(err);
            });
        }



    async getAll(knex, res){
        knex.from("productos").select("*")
        .then((json)=> {
            res.send(json)
        })
        .catch((err) => {
            console.log(err);
        });
        }



    async deleteById(id, knex, res){
        knex("productos")
        .where({id: id})
        .del()
        .then(()=> {
            res.send({ message: "User Deleted"})
        })
        .catch((err) => {
            console.log(err);
        });
    }

    async deleteAll(knex, res){
        knex("productos")
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