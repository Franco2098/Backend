const socket = io();


let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

socket.on("mensaje", (data) => {
 render(data);
})

const render = (data) => {
    let html = data.map((x) =>{
        return `
            <p> <span style="color:blue">${x.email.bold()}</span> 
                <span style="color:brown">[${output} ${date.toLocaleTimeString()}]</span>: 
                <span style="color:green; font-style: italic;">${x.msn}</span> 
            </p>
        `
    }).join(" ");
    document.querySelector("#chat").innerHTML = html;
}


const addInfo = () => {
    let dataObj = {
        email: document.querySelector("#nb").value,
        msn: document.querySelector("#msn").value
    };
    socket.emit("dataChat", dataObj);
    document.querySelector("#msn").value = ""
};

socket.on("productos", (data) => {
    render1(data);
   })

   const render1 = (data) => {
        let html = data.map((x) =>{
        return `
            <p> ${x.name} - ${x.price} - ${x.thumbnail}</p>
        `
    }).join(" ");
    document.querySelector("#product").innerHTML = html;
}

const addInfo1 = () => {
    let dataObj = {
        name: document.querySelector("#name").value, 
        price: document.querySelector("#price").value,
        thumbnail: document.querySelector("#thumbnail").value
    };
    socket.emit("dataProduct", dataObj);
    document.querySelector("#name").value = ""
    document.querySelector("#price").value = ""
    document.querySelector("#thumbnail").value = ""
};

socket.on("productosCarrito", (arrayPrinc, dataCarrito,data) => {
    AñadirCarrito(arrayPrinc,dataCarrito,data)
   })


const Carrito = (data) => {
    socket.emit("dataProductCarrito",data);
}


let elimCarro = document.getElementsByClassName("btn btn-secondary");
for (cart of elimCarro) {
cart.addEventListener("click", e => {
    location.href = "/carrito"
    })}


let carro = document.getElementsByClassName("btn btn-primary");


const AñadirCarrito = (productos, carrito, data) => {
   const selected = productos.find(product => product._id == data);
    socket.emit("dataGuardarCarrito",selected);
    let contador = document.getElementById("lengthCarrito");
    contador.innerHTML = carrito.length + 1
    }


const eliminarProduct = (data) => {
    socket.emit("elimProductCarrito",data);
 }

let categoria = document.getElementsByClassName("dropdown-item");
  

const filtro = (data) => {
    socket.emit("filtroProduct",data);
}

socket.on("filtroProductos", (data) => {
    filtroP(data)
   })

const filtroP = (data) => {
  $("#productStyle").empty();
  if(data.length > 0){
    let html = data.map((product) =>{
    return `
    <div class="card" style="width: 18rem;">
    <div class="imagen">
      <img src= ${product.imagen} class="card-img-top" alt="...">
    </div>
    <div class="card-body">
      <h5 class="card-title">${product.nombre}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Precio: $${product.precio}</li>
      <li class="list-group-item">Plataforma: ${product.plataforma.join("/")}</li>
      <li class="list-group-item">Categoria: ${product.categoria}</li>
      <button id= "boton${product.id}" href="#" class="btn btn-primary">Añadir al Carrito</button>
    </ul>
  </div>
    `
    }).join(" ");
    document.querySelector("#productStyle").innerHTML = html;
    }else{
        let html = 
             `
        <div id= "error" >
        <img src= "/asset/remove.png">
        <h1> NO SE ENCONTRO NINGUN PRODUCTO</h1>
        </div> `
        document.querySelector("#productStyle").innerHTML = html;

}
    
}


let buscar = document.getElementById("buscador2");
buscar.addEventListener("click", () => {
    let teclado = document.getElementById("buscador");
    socket.emit("busquedaProduct",teclado.value);
    
})
