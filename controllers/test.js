import { Leccion, Pregunta, Opcion } from '../models/asosiaciones.js';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';

const presentarEvaluacion = async (req, res) => {
    try {
        const { id_leccion } = req.params;

        //Buscar leccion
        const leccion = await Leccion.findOne({ where: { id_leccion } });

        //Crear JOIN
        const evaluacion = await Leccion.findOne({
            where: { id_leccion },
            include: {
                model: Pregunta,
                include: {
                    model: Opcion
                }
            }
        })

        // Extraer atributos de opciones por pregunta
        const opcionesPorPregunta = evaluacion.pregunta.map(pregunta => {
            // Extraer atributos de cada opción de la pregunta
            const opciones = pregunta.opciones.map((opcion, index) => {
                const opcionJSON = opcion.toJSON();
                opcionJSON.index = index; // Agregar el índice al objeto JSON de la opción
                return opcionJSON;
            });
            return opciones;
        });

        //autenticacion
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

        res.render('test', {
            leccion: leccion,
            preguntas: evaluacion.pregunta,
            opciones: opcionesPorPregunta,
            autenticado: autenticado
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error en el servidor"
        })
    }
}

const calcularResultado = async (req, res) => {
    try {
        const respuestas = req.body;

        console.log(respuestas);
        
        //Lo convierte en arreglo
        const arrayRespuestas = Object.entries(respuestas);
        
        //Recuperar id de la leccion del input
        const id_leccion = arrayRespuestas[arrayRespuestas.length - 1 ][1];

        //Buscar leccion
        const leccion = await Leccion.findOne({ where: { id_leccion } });

        //Eliminar id del body de respuestas
        arrayRespuestas.pop();

        let respuestasCorrectas = [];

        for(let i=0; i<arrayRespuestas.length; i++){
            //id del body enviado
            const id_pregunta = arrayRespuestas[i][0];            
            
            //Busca respuesta correcta de acuerdo al id
            const es_correcta = await Opcion.findOne({
                where: {
                    id_pregunta,
                    es_correcta: true
                },
                attributes: ['id_opcion']
            })
            respuestasCorrectas.push([id_pregunta, '' + es_correcta.id_opcion]);


        }

        
        //Calificacion
        let puntuacion = 0;

        for(let i = 0; i<arrayRespuestas.length; i++){
            if(arrayRespuestas[i][1] === respuestasCorrectas[i][1] ){
                puntuacion += 1;
            }
        }

        const calificacion = ((puntuacion * 10) / arrayRespuestas.length).toFixed(2);

        console.log(calificacion);

        //Crear JOIN de respuestas correctas
        const evaluacion = await Leccion.findOne({
            where: { id_leccion },
            include: {
                model: Pregunta,
                include: {
                    model: Opcion,
                    where: { es_correcta: true }
                }
            }
        })

        // Extraer atributos de opciones por pregunta
        const opcionesPorPregunta = evaluacion.pregunta.map(pregunta => {
            // Extraer atributos de cada opción de la pregunta
            const opciones = pregunta.opciones.map((opcion, index) => {
                const opcionJSON = opcion.toJSON();
                opcionJSON.index = index; // Agregar el índice al objeto JSON de la opción
                return opcionJSON;
            });
            return opciones;
        });

        //autenticacion
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
        
        return res.render('calificacion', {
            calificacion: calificacion,
            leccion : leccion,
            preguntas: evaluacion.pregunta,
            opciones: opcionesPorPregunta,
            autenticado: autenticado
        })

    } catch (error) {
        return res.render('alertas', {
            mensaje: "Error en el servidor:("
        });
    }
}

export {
    presentarEvaluacion,
    calcularResultado
}