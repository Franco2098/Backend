import { expect } from "chai";
import supertest from "supertest";



describe("FUNCIONES HTTP",() =>{
    describe("PRUEBAS GET",()=>{
        it("STATUS 200", async ()=>{
            const respuesta = await supertest("http://localhost:8080").get("/api/productos")
            expect(respuesta.status).to.eql(200)    
        })
        it("VERIFICACION LENGTH", async ()=>{
            const respuesta = await supertest("http://localhost:8080").get("/api/productos")
            expect(respuesta.body).to.have.lengthOf(8)    
        })

    })
    describe("PRUEBAS POST",() =>{
        const data = {"name":"Grand Theft Auto V", "price": 1000, "thumbnail":"/asset/gta5.webp"}
        it("TIPO DE DATO AÑADIDO", async ()=>{ 
            const productoAgregado = await supertest("http://localhost:8080").post("/api/productos").send(data)
            expect(typeof(productoAgregado)).to.eql("object")    

        })
        it("STATUS 200",async()=>{
            const productoAgregado = await supertest("http://localhost:8080").post("/api/productos").send(data)
            expect(productoAgregado.status).to.eql(200)    
        })
        
    })

})