import {Router} from 'express';
import {perfilLeccion } from '../controllers/profile-leccion.js';
const router = Router();

router.get('/:id_leccion', perfilLeccion );

export default router;