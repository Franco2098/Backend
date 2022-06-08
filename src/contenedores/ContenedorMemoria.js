let id = 1

class contenedor {
    constructor () {
    this.arrayVacio = []
    }

    save (obj){
        obj = {...obj, timeStamp: Date.now()}
        this.arrayVacio.push(obj)
        this.arrayVacio.map((el) => ({...el, id: id++})),null,2                        
    }

    getById(id) {
        let productoId = this.arrayVacio.find(x => {return x.id == id})
        if (productoId) {
            return productoId
        }else{
            productoId = {error: "Producto no encontrado"}
            return productoId
        } 
    }

    getAll(){
        if (this.arrayVacio.length != 0) {
            return this.arrayVacio
        }else{
            return "El Array esta vacio"
        }        
    }

    actualizar(obj) {
        let nuevaData = this.arrayVacio.filter(x => {return x.id != obj.id});
        nuevaData.push(obj);
        nuevaData.sort((a, b) => a.id - b.id);
    }

    deleteById(id){
        let nuevaData = this.arrayVacio.filter(x => {return x.id != id})
        if (this.arrayVacio.length != nuevaData.length) {
            let producto = ("Producto eliminado")
            return producto
        }else{
            let producto = ("Producto no encontrado")
            return producto
        }      
    }

    deleteAll(){
        this.arrayVacio = []
    }

}

export default contenedor