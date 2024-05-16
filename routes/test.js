import {Router} from 'express';
import { presentarEvaluacion, calcularResultado } from '../controllers/test.js';
const router = Router();

router.get('/:id_leccion', presentarEvaluacion);

router.post('/calcular', calcularResultado);

export default router;