const express = require("express");
const app = express();

const productosRoutes = require("./routes/productos")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/static", express.static("../public"))

app.use("/api", productosRoutes)

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error `));


