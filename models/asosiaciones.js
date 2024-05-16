import Leccion from './Leccion.js'
import Temario from './Temario.js'
import Pregunta from './Pregunta.js'
import Opcion from './Opcion.js'


Temario.belongsTo(Leccion, {foreignKey: 'id_leccion'})

Leccion.hasMany(Temario, {foreignKey: 'id_leccion'})

Leccion.hasMany(Pregunta, {foreignKey: 'id_leccion'})

Pregunta.belongsTo(Leccion, {foreignKey: 'id_leccion'})

Pregunta.hasMany(Opcion, {foreignKey: 'id_pregunta'})

Opcion.belongsTo(Pregunta, {foreignKey: 'id_pregunta'})



export {
    Temario,
    Leccion,
    Pregunta,
    Opcion
}