import {Leccion, Temario} from '../models/asosiaciones.js'
import jwt from 'jsonwebtoken';


const leccionesController = async (req, res) => {
    try {
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

        const lecciones = await Leccion.findAll({
            include: {
                model: Temario
            }
        });
        // console.log(lecciones);
        res.render('index', {
            lecciones: lecciones,
            autenticado: autenticado,
            token: tokenId
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error en el servidor"
        })
    }
}

const formularioRegistro = (req, res) => {
    res.render('signup'), {
        pagina: "Crear cuenta"
    }
}

const formularioAuth = (req, res) => {
    res.render('auth'), {
        pagina: "Iniciar sesión"
    }
}

const cerrarSesion = (req, res) => {
    try {
        // Eliminar el token del lado del cliente (eliminar la cookie
        res.clearCookie('_token');

         // Redireccionar o enviar una respuesta JSON u HTML indicando que la sesión se ha cerrado
        res.redirect('http://localhost:8080');
    } catch (error) {
        return res.status(500).json({
            msg: "Error en el servidor"
        })
    }
}

export {
    leccionesController,
    formularioRegistro,
    formularioAuth,
    cerrarSesion
}