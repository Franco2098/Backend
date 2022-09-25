
const typeDefs = `

    type Query {
        getAllProducts: [Product]

    }

    type Mutation{
        addProduct(input:ProductInput) : Product
        deleteProduct(id:ID): Product
        updateProduct(id:ID, input:ProductInput): Product
    }

    type Product {
        id:ID
        name:String
        price:Int
        thumbnail:String
    }

    input ProductInput{
        name:String
        price:Int
        thumbnail:String
    }

    


`

export default typeDefs