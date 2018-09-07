let descripcion = {
    descripcion: {
        alias: "d", 
        demand: true, 
        desc: 'Descripcion de la tarea por hacer'
    }
}

let completado = {
    completado: {
        alias: "c", 
        default: true,
        desc: "marca como completado o pendiente la tarea"       
    }
}

const argv = require("yargs")
.command("crear", "comando para crear una nueva tarea", {
    descripcion
})
.command("actualizar", "comando que actualiza una tarea", {
    descripcion, 
    completado
})
.command("borrar", "borra una tarea de la lista", {
    descripcion
})
.help()
.argv; 

module.exports= {
    argv
}