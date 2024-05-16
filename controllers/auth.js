import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'
import { generarJWT } from "../helpers/tokens.js";
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import { Leccion } from '../models/asosiaciones.js'
import jwt from 'jsonwebtoken';


const registroUsuario = async (req, res) => {
    try {
        await check('name').notEmpty().withMessage('Nombre no valido').run(req);
        await check('email').isEmail().withMessage('Correo no valido').run(req);
        await check('password').notEmpty().withMessage('Contraseña no valido').run(req);

        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                errores: errores.array()
            });
        }

        const { name, email, password } = req.body;

        console.log(name, email, password);
        //Verificar que no haya duplicados
        const existeUsuario = await Usuario.findOne({ where: { email } });
            if (existeUsuario) {
                return res.render('alertas', {
                    mensaje: "Este usuario ya existe"
                });
        }

        const usuario = await Usuario.create({
            email,
            password,
            nombre: name
        });

        res.redirect("http://localhost:8080");


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error en el servidor"
        })
    }
}


//Autenticacion del usuario
const autenticar = async (req = request, res = response) => {
    try {
        //Validacion 
        await check('email').isEmail().withMessage('Correo no valido').run(req);
        await check('password').notEmpty().withMessage('Contraseña obligatoria').run(req);
        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                errores: errores.array()
            });
        }

        //Extraer datos
        const { email, password } = req.body;

        //Verificar si el usuario existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario no existente"
            })
        }

        //Revisar password
        if (!usuario.verificarPassword(password)) {
            return res.status(401).json({
                msg: "La contraseña es incorrecta"
            })
        }

        //Autenticar usuario
        const token = generarJWT(usuario.id_usuario);

        //Almacenar en un cookie
        res.cookie('_token', token, {
            httpOnly: true,
            //secure: true
        })

        const id_usuario =usuario.id_usuario

        // await Usuario.update({
        //     autenticado: true
        // }, {
        //     where: { email }
        // })

        const lecciones = await Leccion.findAll();

        const {_token} = req.cookies;

        let tokenId;
        let autenticado;
        if(_token){
            autenticado=true;
            const token = jwt.verify(_token, process.env.JWT_SECRET);
            tokenId = token.id;
        } else {
            autenticado=false
        }

        // res.render('index', {
        //     lecciones: lecciones,
        //     autenticado: autenticado,
        //     token: tokenId,
        //     id_usuario
        // });
        // Redireccionar o enviar una respuesta JSON u HTML indicando que la sesión se ha cerrado
        res.redirect('http://localhost:8080');

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ocurrió un error al intentar autenticar'
        });
    }
}

export {
    registroUsuario,
    autenticar
}

