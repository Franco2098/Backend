const express = require("express");

const app = express();

app.set("view engine", "pug")
app.set("views", "../views")


const productosRoutes = require("./routes/productos")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(express.static("../public"))


app.use("/api", productosRoutes)


const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error `));


