import {Router} from "express"
import passport from "passport"
import {registro1, login1, formulario, principal, carrito, compra, logout, errorRegistro, errorLogin, logout1, guardar1, actualizar1, borrar1, borrarTodos1, mostrarId1, buscarId1} from "../controllers/operaciones.js"
import multer from "multer"

const router = Router()

let storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./public/asset")
    },
    filename: function (req,file,cb){
        cb(null, req.body.nombre.replace(/ /g, "")+ ".jpg")
    }
})

let upload = multer({storage: storage})

router.get('/registro', registro1)

router.get('/login', login1)
 
router.get('/formulario', formulario)

router.get('/principal', principal)

router.get('/carrito', carrito)

router.get('/compra', compra)

router.get('/logout', logout)

router.get('/errorRegistro', errorRegistro)

router.get('/errorLogin', errorLogin)

router.get("/logout_", logout1)

router.get('/productos/:id', mostrarId1)

router.get('/buscarProducto', buscarId1)

router.post("/productos", upload.single("imagen"), guardar1)

router.put("/productos/:id", actualizar1)

router.delete("/productos/:id", borrar1)

router.delete("/productos", borrarTodos1)


router.post("/registro", passport.authenticate("registro", {
    failureRedirect: "/errorRegistro",
    successRedirect: "/principal"
}))

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/errorLogin",
    successRedirect: "/principal"
}))


export default router