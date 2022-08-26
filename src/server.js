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
import contenedor from "./persistencia/contenedores/contenedorKnex.js";
import config from "./persistencia/config.js"
import {Server} from "socket.io"
dotenv.config()

const numCPUs = cpus().length
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const MODO_CLUSTER = process.argv[2] === "CLUSTER"
let arrayP = []
let arrayM = []
let id = 1

const contenedor2 = new contenedor(config.mariaDb,"mensajes")
const contenedor1 = new contenedor(config.mariaDb,"productos")

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
    partialsDir: __dirname+"/views/partials"
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
        contenedor2.save(data).then( ()=> console.log("Mensaje añadido"));
        data = {...data, id: id++}
        arrayM.push(data)
        io.sockets.emit("mensaje", arrayM);
    
    });

    socket.on("dataProduct", (data) =>{
        contenedor1.save(data).then( ()=> console.log("Producto añadido"));
        arrayP.push(data)
        io.sockets.emit("productos", arrayP);
    });
})

app.use('/api', operacionesRoutes)

app.get("/", (req,res)=> {
    res.render("login")
})

server.listen(8080, () => {
  console.log(`Proceso ${process.pid}`)
})

mongoose.connect(process.env.MONGO, advancedOptions)
.catch(err=>console.log("err"))

}