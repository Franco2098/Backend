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
import {graphqlHTTP} from "express-graphql"
import {makeExecutableSchema} from "@graphql-tools/schema"
import typeDefs from "./graphql/schema.js"
import resolvers from "./graphql/resolvers.js"


dotenv.config()

const schema = makeExecutableSchema ({
    typeDefs: typeDefs,
    resolvers: resolvers
})

const productos = Factory.crearDaoProductos()
const mensajes = Factory.crearDaoMensajes()

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
        mensajes.save(data).then( ()=> console.log("Mensaje añadido"));
        data = {...data, id: id++}
        arrayM.push(data)
        io.sockets.emit("mensaje", arrayM);
    
    });

    socket.on("dataProduct", (data) =>{
        productos.save(data).then( ()=> console.log("Producto añadido"));
        arrayP.push(data)
        io.sockets.emit("productos", arrayP);
    });
})

app.use('/api', operacionesRoutes)

app.use("/graphql", graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.get("/", (req,res)=> {
    res.render("login")
})

server.listen(8080, () => {
  console.log(`Proceso ${process.pid}`)
})

mongoose.connect(process.env.MONGO, advancedOptions)
.catch(err=>console.log("err"))

}