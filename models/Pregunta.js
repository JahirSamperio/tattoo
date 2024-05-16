import { DataTypes } from "sequelize";
import db from '../db/conexion.js'

const Pregunta = db.define('pregunta', {
    id_pregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_leccion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pregunta: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Pregunta;