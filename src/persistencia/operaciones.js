import Factory from "../persistencia/contenedores/factory.js"


const productos = Factory.crearDaoProductos()
const carrito = Factory.crearDaoCarrito()
const mensaje = Factory.crearDaoMensajes()



export async function mostrar(){
    const pro = await productos.getAll()
    return pro
}

export async function mostrarCarrito(){
    const pro = await carrito.getAll()
    return pro
}

export async function mostrarId(req,res){
    productos.getById(req.params.id).then( (obj)=> res.send(obj))
    
}

export async function guardar(req,res){
    req.body.imagen = `/asset/${req.body.nombre.replace(/ /g, "")}.jpg`
    productos.save(req.body)
    res.render("formulario")
}

export async function guardarCarrito(data){
    carrito.save(data)
}

export async function guardarMensaje(data){
    mensaje.save(data)
}

export async function actualizar(req,res){
    productos.update(req,res).then( ()=> res.send("Producto actualizado"))
}

export async function borrarCarrito(data){
    carrito.deleteById(data)
    
}

export async function borrarTodos(req,res){
    productos.deleteAll().then( ()=> res.send("Productos eliminados"))
}

export async function borrar(req,res){
    productos.deleteById(req.params.id).then( ()=> res.send("Producto eliminado"))
    
}

export async function buscarId(req,res){
    const pro = await productos.getById(req.query.id)
    res.render("formulario",{nombre:pro.nombre, plat1: pro.plataforma[0], plat2: pro.plataforma[1], plat3: pro.plataforma[2],  precio: pro.precio, categoria: pro.categoria})

    
}
