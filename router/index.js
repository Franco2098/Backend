const express = require("express");
const {engine} = require("express-handlebars")
const app = express();

const fs = require("fs")

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

let arrayMensajes = [];
let arrayProductos = [];


const {Server} = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) =>{

    socket.on("dataChat", (data) =>{
    save("mensajes.json", arrayMensajes, data, "mensaje")
    //arrayMensajes.push(data);
    io.sockets.emit("mensaje",arrayMensajes);
    //save("mensajes.json", arrayMensajes, data)
    });

    socket.on("dataProduct", (data) =>{
        save("producto.json", arrayProductos, data, "productos")
        //arrayProductos.push(data);
        io.sockets.emit("productos",arrayProductos);
        //save("producto.json", arrayProductos, data)
    });
})

app.use("/api", productosRoutes);


server.listen(8080, () => {
    
})


async function save (nombreArchivo, array, obj, emision){
    try {
        if (fs.existsSync(nombreArchivo)){
            let data = await fs.promises.readFile(`./${nombreArchivo}`, {encoding:"utf-8"})
            if (data){
                array = JSON.parse(data)
                array.push(obj)
                io.sockets.emit(emision, array);
                await fs.promises.writeFile(`./${nombreArchivo}`, JSON.stringify(array), {encoding:"utf-8"})
                    try {                              
                    }catch (err){
                    console.log("error")
                }
            }else{
                array.push(obj)
                io.sockets.emit(emision, array);
                await fs.promises.writeFile(`./${nombreArchivo}`, JSON.stringify(array), {encoding:"utf-8"})
                try {                           
                }catch (err){
                    console.log("error")
                }
            }
        }else{
            array.push(obj)
            io.sockets.emit(emision, array);
            await fs.promises.writeFile(`./${nombreArchivo}`, JSON.stringify(array), {encoding:"utf-8"})
                    try {
                    }catch (err){
                    console.log("error")
                    }
        } 
    }catch (err) {
        console.log("error")
    }                        
}