import { Router } from 'express';
import { check } from 'express-validator';
import { obtenerUsuario, obtenerUsuarios } from '../controllers/usuarios.controllers';

const router = Router();

router.route('/usuarios/:id').get(obtenerUsuario); //Para la busqueda de un usuario por id

router.route('/usuarios').get(obtenerUsuarios); //Para obtener todos los usuarios almacenados en la bd

export default router;