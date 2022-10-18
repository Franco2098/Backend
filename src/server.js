import express from 'express'
import operacionesRoutes from "./routes/operaciones.js"
import {engine} from "express-handlebars"
import passport from 'passport'
import cluster from 'cluster'
import mongoose from 'mongoose'
import sessionRoutes from "./routes/operaciones.js"
import MongoStore from "connect-mongo"
import http from "http"
import session from 'express-session'
import path from 'path';
import { fileURLToPath } from 'url';
import {cpus} from "os"
import dotenv from "dotenv"
import {Server} from "socket.io"
import Factory from "./persistencia/contenedores/factory.js"
import Handlebars from "handlebars"
import {allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access"

import {mostrar, mostrarCarrito, guardarCarrito, borrarCarrito, guardarMensaje} from "../src/persistencia/operaciones.js"
import {mail} from "../src/services/operaciones.js"


dotenv.config()

const productos = Factory.crearDaoProductos()


const numCPUs = cpus().length
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const MODO_CLUSTER = process.argv[2] === "CLUSTER"
let arrayP = []
let arrayM = []
let id = 1


if (MODO_CLUSTER && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
}else{
    
app.set("view engine", "hbs");
app.set("views", __dirname+"/views");

app.engine("hbs", engine({
    extname:".hbs",
    defaultLayout:"main.hbs",
    partialsDir: __dirname+"/views/partials",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:"key",
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:60000},
    store: MongoStore.create({
        mongoUrl: process.env.MONGO,
        mongoOptions: advancedOptions
    })
}))
app.use("/", sessionRoutes)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server)

io.on("connection", (socket) =>{
    
    socket.on("dataChat", (data) =>{
        guardarMensaje(data)
        arrayM.push(data)
        io.sockets.emit("mensaje", arrayM);
    
    });

    socket.on("dataProduct", (data) =>{
        productos.save(data).then( ()=> console.log("Producto añadido"));
        arrayP.push(data)
        io.sockets.emit("productos", arrayP);
    });

    socket.on("dataProductCarrito", async (data) =>{
        const arrayPrinc = await mostrar()
        const arrayCarrito = await mostrarCarrito()
        const array = arrayCarrito.filter(x => x.email == mail)
        io.sockets.emit("productosCarrito", arrayPrinc, array, data);
    });

    socket.on("dataGuardarCarrito", async (data) =>{
        data = {email: mail, ...data} 
        delete data._id
        guardarCarrito(data)
    });
    
    socket.on("elimProductCarrito", async (data) =>{
        borrarCarrito(data)  
    });

    socket.on("filtroProduct", async (data) =>{
        let arrayFiltro = []
        const arrayPrinc = await mostrar()
        if (data == "PS4" || data == "PC" || data == "XBOX"){
            arrayPrinc.map((x) => {
            const selected = x.plataforma.find(product => product == data);
            if (selected){
                arrayFiltro.push(x) 
            }
            })
            io.sockets.emit("filtroProductos", arrayFiltro);
        }else{
            const selected = arrayPrinc.filter(product => product.categoria == data);
            io.sockets.emit("filtroProductos", selected);
        }
             
    });
    
    socket.on("busquedaProduct", async (teclado) =>{
        let array = []
        const arrayPrinc = await mostrar()
        arrayPrinc.filter(item => {
            if (item.nombre.toLowerCase().includes(teclado.toLowerCase())){
                array.push(item)
            }
    });         
                io.sockets.emit("filtroProductos", array); 
    });

})

app.use('/', operacionesRoutes)



app.get("/", async (req,res)=> {
    const arrayPrinc = await mostrar()
    const arrayCarrito = await mostrarCarrito()
    const array = arrayCarrito.filter(x => x.email == mail)
    res.render("principal",{data:arrayPrinc, dataCar: array.length})
})

server.listen(8080, () => {
  console.log(`Proceso ${process.pid}`)
})

mongoose.connect(process.env.MONGO, advancedOptions)
.catch(err=>console.log("err"))

}


