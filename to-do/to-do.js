const fs = require("fs");

let listadoPorHacer = [];

//Crea un objeto tarea y lo almaceda en el array declarado anteriormente. 
const crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion, 
        completado: false,
    }

    listadoPorHacer.push(porHacer);
    guardarDB()
    return porHacer
}


//Crearé un archivo JSON que contenga los objetos que se forman al crear una tarea. 
const guardarDB = () => {

    //Transformo a Json mi arreglo de tareas
    let data = JSON.stringify(listadoPorHacer);

    //Convierto mi data en formato json en un archivo 
    fs.writeFile("db/data.json", data, (err) => {
        if (err) {
            throw new Error("no se pudo grabar en la base de datos")
        }
    })
}

//Me traigo la informacion desde la base de datos 

const cargarDB = () => {

    try {
        listadoPorHacer = require("../db/data.json");
    } catch (error) {
        listadoPorHacer = []
    }

    return listadoPorHacer

}

//Funcion que retorna el listado de la base de datos 
const getListado = () => {
    cargarDB()

    return listadoPorHacer
}

const actualizar = (descripcion, completado = true) => {
    cargarDB()

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return "Actualizado con exito"
    } else {
        console.log("No exista esa tarea en la lista")
        return "problemas al actualizar la tarea de la BD"
    }
}

const borrar = (descripcion) => {
    cargarDB()

    let nuevoListado = listadoPorHacer.filter( tarea => {
        return tarea.descripcion !== descripcion
    })

    if( nuevoListado.length === listadoPorHacer.length){
        return "Problemas al borrar el elemento de la base de datos"
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB()
        return "Tarea borrada con éxito"
    }

/*     let tarea = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    })

    listadoPorHacer.splice(tarea, 1)

    guardarDB()

    return "Tarea borrada con exito" */


}

module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar
}