import {Router} from 'express';
import { registroUsuario, autenticar } from '../controllers/auth.js';
const router = Router();

router.post('/registro', registroUsuario);

router.post('/login', autenticar);


export default router;