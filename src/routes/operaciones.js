import {Router} from "express"
import compression from "compression"
import passport from "passport"
import {registro1, login1, formulario, logout, errorRegistro, errorLogin, mostrar1, mostrarId1, info1, guardar1, guardarFaker1, actualizar1, borrar1, borrarTodos1, logout1} from "../controllers/operaciones.js"

const router = Router()


router.get('/registro', registro1)

router.get('/login', login1)
 
router.get('/formulario', formulario)

router.get('/logout', logout)

router.get('/errorRegistro', errorRegistro)

router.get('/errorLogin', errorLogin)

router.get('/productos', mostrar1)

router.get('/productos/:id', mostrarId1)

router.get("/info", info1)

router.get("/infoZip", compression(), info1)

router.get("/logout_", logout1)

router.post("/productos", guardar1)

router.post("/productos-test", guardarFaker1)

router.put("/productos/:id", actualizar1)

router.delete("/productos/:id", borrar1)

router.delete("/productos", borrarTodos1)

router.post("/registro", passport.authenticate("registro", {
    failureRedirect: "/errorRegistro",
    successRedirect: "/formulario"
}))

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/errorLogin",
    successRedirect: "/formulario"
}))




export default router