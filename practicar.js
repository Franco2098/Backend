const nom = "Franco"
const apell = "Lopez"
let lib = [{nombre: "El Señor de las Moscas", autor: "William Golding"}]
let animales = ["perro", "gato"]
const mas = "loro"
const nomLibro = "Fundacion"
const nomAutor = "Isaac Asimov"
let arrayVacio = []

class usuario {
    constructor (nombre, apellido, libro, mascota) {
    this.nombre = nombre
    this.apellido = apellido
    this.libro = libro
    this.mascota = mascota
    }

    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`)
    }

    addMacota(anim) {
        this.mascota.push(anim)
        console.log(this.mascota)
    }

    countMascotas(){
        console.log(this.mascota.length)
    }

    addBook(nombre, autor){
        this.libro.push({nombre, autor})
        console.log(this.libro)
    }

    getBookNames(array){
        for (let nom of this.libro){
            array.push(nom.nombre)
        }
        console.log(array)
    }

}

const usuario1 = new usuario(nom, apell, lib, animales)

usuario1.getFullName()
usuario1.addMacota(mas)
usuario1.countMascotas()
usuario1.addBook(nomAutor,nomLibro)
usuario1.getBookNames(arrayVacio)