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
        name: document.querySelector("#nm").value,
        lastname: document.querySelector("#ln").value, 
        age: document.querySelector("#ag").value, 
        alias: document.querySelector("#al").value, 
        avatar: document.querySelector("#av").value, 
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


