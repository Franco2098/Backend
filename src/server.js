import koa from "koa"
import body from "koa-body"
import router from "./routes/operaciones.js"
 
const app = new koa()

app.use(body())
app.use(router.routes())


app.listen(8080, () => {
    console.log(`Proceso ${process.pid}`)
  })