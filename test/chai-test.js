import chai from "chai"
import { getProductos, postProductos } from "../server.js"
const assert = chai.assert

describe("FUNCIONES HTTP",() =>{
    describe("PRUEBAS GET",()=>{
         it("MOSTRAR TODOS LOS PRODUCTOS", async ()=>{
            const productos = await getProductos()
            assert.typeOf(productos,"array")  
        })   
    })
    describe("PRUEBAS POST", () =>{
        const data = {"name":"Grand Theft Auto V", "price": 1000, "thumbnail":"/asset/gta5.webp"}
        const productoAgregado = postProductos(data)
        it("TIPO DE DATO AÑADIDO", async ()=>{
            assert.typeOf(await productoAgregado,"object")  
        })
        it("PROPIEDADES CORRECTAS",async()=>{
            assert.hasAllKeys(await productoAgregado,["name", "price", "thumbnail"])
        })
        it("VERIFICACION PRODUCTO AÑADIDO", async()=> {
            const productoNuevo = await getProductos()
            assert.lengthOf(productoNuevo, 9 )
        })

    })

})




