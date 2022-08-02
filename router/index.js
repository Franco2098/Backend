const express = require("express");
const {engine} = require("express-handlebars")
const session = require("express-session");
const passport = require("passport")
const yargs = require("yargs")
require("dotenv").config()
const {fork} = require("child_process")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length

const args = yargs.alias({p:"puerto", m:"modo"})
     .default({p:8080, m:"FOLK"})
     .argv

const MODO_CLUSTER = process.argv[2] === "CLUSTER"

if (MODO_CLUSTER && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
}else{
    
const MongoStore = require("connect-mongo")
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

const app = express();

const knex = require("./db")

const {normalize, schema} = require("normalizr")
const {inspect} = require("util")


const contenedor = require("./routes/metodos.js")

const contenedor2 = new contenedor("mensajes")
const contenedor1 = new contenedor("productos")

let arrayP = []
let arrayM = []
let id = 1

const mensajesSchema = new schema.Entity("Mensajes")

const mensajeslistSchema = new schema.Array(mensajesSchema)

const http = require("http");
const server = http.createServer(app);

app.set("view engine", "hbs");
app.set("views", "../views");

app.engine("hbs", engine({
    extname:".hbs",
    defaultLayout:"main.hbs",
    partialsDir: __dirname+"/views/partials"
}));

const productosRoutes = require("./routes/productos");
const sessionRoutes = require("./routes/productos");


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

app.use(express.static("../public"));

const {Server} = require("socket.io");
const { json } = require("express");
const io = new Server(server);

io.on("connection", (socket) =>{
    
    socket.on("dataChat", (data) =>{
        contenedor2.save(data).then( ()=> console.log("Mensaje añadido"));
        data = {...data, id: id++}
        arrayM.push(data)
        io.sockets.emit("mensaje", arrayM);
        
        function print(obj){
            console.log(inspect(obj,false,12,true))
        }

        const mensajesNormalized = normalize(arrayM,mensajeslistSchema)

        print(mensajesNormalized)

    });

    socket.on("dataProduct", (data) =>{
        contenedor1.save(data).then( ()=> console.log("Producto añadido"));
        arrayP.push(data)
        io.sockets.emit("productos", arrayP);
    });
})

app.get('/api/random', (req, res) => {
    const result = {}
  
    const amount = parseInt(req.query.cant) || 100_000_000
  
    const forked = fork('./random.js')
  
    forked.send({ start: true, amount })
  
    forked.on('message', (result) => {
  
      res.json(result)
  
    })
  })


app.use("/api", productosRoutes);

server.listen(args.p, () => {
  console.log(`Proceso ${process.pid}`)
})


const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO
)

.catch(err=>console.log("err"))

}
