const nodemailer = require("nodemailer")
const Usuarios = require("../user.js")
const Carrito = require("../router/routes/carritoMongo.js")
const nombre = require("../router/routes/productos.js")


const arrayBD =  Usuarios.find({})
const usuarioBd = arrayBD.find((el)=> (el.nombre == arrayBD.nombre ))
const carritoBD =  Carrito.find({})



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "	madisen.nolan97@ethereal.email",
        pass: 'hzQ1uhFbdVmCjFFzSm'
    }
});

const mail = () => {
transporter.sendMail({
    from: 'Servidor Node.js',
    to: "madisen.nolan97@ethereal.email",
    subject: `Nuevo pedido de ${nombre} ${usuarioBd.email} `,
    html: `${carritoBD}`
})
}
