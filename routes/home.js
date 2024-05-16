import {Router} from 'express';
import { leccionesController, formularioRegistro, formularioAuth, cerrarSesion} from '../controllers/homeController.js';
const router = Router();

router.get('/', leccionesController)

router.get('/auth', formularioAuth );

router.get('/signup', formularioRegistro );

router.post('/signout', cerrarSesion);

export default router;