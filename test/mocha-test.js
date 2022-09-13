import assert from "assert"
import { getProductos, postProductos } from "../server.js"


describe("FUNCIONES HTTP",() =>{
    describe("PRUEBAS GET",()=>{
         it("MOSTRAR TODOS LOS PRODUCTOS", async ()=>{
            const productos = await getProductos()
            assert.equal(typeof(productos),"object")  
        })   
    })
    describe("PRUEBAS POST", () =>{
        const data = {"name":"Grand Theft Auto V", "price": 1000, "thumbnail":"/asset/gta5.webp"}
        const productoAgregado = postProductos(data)
        it("TIPO DE DATO AÑADIDO", async ()=>{
            assert.equal(typeof(productoAgregado),"object")  
        })
        it("PROPIEDADES CORRECTAS",async()=>{
            assert.deepStrictEqual(await productoAgregado, data)
        })
        it("VERIFICACION PRODUCTO AÑADIDO", async()=> {
            const productoNuevo = await getProductos()
            assert.equal(productoNuevo.length, 9 )
        })

    })

})