import { Router } from 'express';
import { check } from 'express-validator';
import { obtenerUsuario } from '../controllers/usuarios.controllers';

const router = Router();

router.route('/usuarios/:id').get(obtenerUsuario);

export default router;