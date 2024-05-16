import { DataTypes } from "sequelize";
import db from '../db/conexion.js'

const Temario = db.define('temario', {
    id_temario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orden: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    contenido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_leccion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Temario;