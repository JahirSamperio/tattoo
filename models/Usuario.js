import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import db from '../db/conexion.js'

const Usuario = db.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmado: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    autenticado: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password, salt)
        }
    }
})
//Metodos personalizados
Usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password); //pssword es la constante que envio el usuario y this.password es desde la base de datos a comparar
}

export default Usuario;