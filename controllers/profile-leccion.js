import {Temario, Leccion} from '../models/asosiaciones.js'
import jwt from 'jsonwebtoken';


const perfilLeccion = async (req, res) => {
    try {
        //Buscar token de autenticacion
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

        //INicio del controlador
        const { id_leccion } = req.params;

        const leccion = await Leccion.findOne({where: { id_leccion } });

        const temario = await Temario.findAll({where: { id_leccion } });

        res.render('profile-leccion', {
            temario: temario,
            leccion: leccion,
            autenticado:autenticado
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error en el servidor"
        })
    }
}

export {
    perfilLeccion
}
