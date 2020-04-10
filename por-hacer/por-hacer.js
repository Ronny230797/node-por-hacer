const fs = require('fs')


let listadoPorHacer = []

const gurdarDB = () => {
    //Guardo en la variabla data el array por listadoporhacer pero con formato json para almacenarlo
    //en mi archivo json que va a servir de db 
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar el archivo data.json', err)
        console.log('Exito al guardar el archivo data.json con el listado por hacer!');
    });

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = []
    }
}

const crear = (descripcion) => {
    cargarDB()
        //En Ecmascript6 descripcion de mi objeto porHacer es lo mismo que si hiciera descripcion:descripcion, diciendo que es igual al param descripcion
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer)
    gurdarDB()
    return porHacer
}

const getListado = () => {
    cargarDB()
    return listadoPorHacer
}

const actualizar = (descripcion, completado = true) => {
    cargarDB()
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        gurdarDB()
        return true
    } else {
        return false
    }

}

const borrar = (descripcion) => {
    cargarDB()
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)
    if (listadoPorHacer.length === nuevoListado.length) {
        return false
    } else {
        listadoPorHacer = nuevoListado
        gurdarDB()
        return true
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}