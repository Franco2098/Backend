const express = require("express");
const {engine} = require("express-handlebars")
const app = express();

const contenedor = require("./routes/metodos.js")

const contenedor2 = new contenedor("productos.json")

const knex = require("./db")

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

let arrayP = []
let arrayM = []

app.use(express.static("../public"));

const {Server} = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) =>{

    socket.on("dataChat", (data) =>{
        let objNew = {
            email: data.email,
            msn: data.msn    
        };

        knex("mensajes")
            .insert(objNew)
            .then(()=> {
                console.log("Register ok");
            })
            .catch((err) => {
                console.log(err);
            });
        
        arrayM.push(data)
        io.sockets.emit("mensaje", arrayM);
    });

    socket.on("dataProduct", (data) =>{
        contenedor2.save(data, knex);
        arrayP.push(data)
        io.sockets.emit("productos", arrayP);
    });
})

app.use("/api", productosRoutes);


server.listen(8080, () => {
    
})


