const express = require("express");
const {engine} = require("express-handlebars")
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

app.use(express.json());
app.use(express.urlencoded({extended:true}));


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

app.use("/api", productosRoutes);


server.listen(8080, () => {
    
})


