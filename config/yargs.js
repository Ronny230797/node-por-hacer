const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea'
}
const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca de completado o pendiente la tarea',
    type: 'boolean'
}


const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado de completado de una tarea', { descripcion, completado })
    .command('borrar', 'Borra una tarea por hacer', { descripcion })
    .help()
    .argv

module.exports = {
    argv
}