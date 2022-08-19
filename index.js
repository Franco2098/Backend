const express = require("express");
const Handlebars = require('handlebars')
const {engine} = require("express-handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require("express-session");
const passport = require("passport")
const yargs = require("yargs")
require("dotenv").config()
const {fork} = require("child_process")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const logger = require("./router/logger.js")
const mongoose = require('mongoose');

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

const {inspect} = require("util")

const http = require("http");
const server = http.createServer(app);

app.set("view engine", "hbs");
app.set("views", "./views");

app.engine("hbs", engine({
    extname:".hbs",
    defaultLayout:"main.hbs",
    partialsDir: __dirname+"/views/partials",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

const productosRoutes = require("./router/routes/productos");
const sessionRoutes = require("./router/routes/productos");


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

app.use(express.static(__dirname + "/public"));


const { json } = require("express");


app.use("/api", productosRoutes);

PORT = process.env.PORT || 8080

server.listen(PORT, () => {
  console.log(`Proceso ${process.pid}`)
})

mongoose.connect(
    process.env.MONGO
)
.catch(err=>console.log("err"))

}
