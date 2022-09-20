import Factory from "../persistencia/contenedores/factory.js"

const productos = Factory.crearDaoProductos()


const resolvers = {

    Query:{
        getAllProducts:()=> {
            return productos.getAll()
        },
    },

    Mutation:{
        addProduct: async (_, {input})=>{
            return productos.save(input)
        },
        deleteProduct: async(_,{id})=>{
        return productos.deleteById(id)
        },
        updateProduct: async(_,{id,input})=>{
            return productos.update(id,input)
            },
    },

}

export default resolvers