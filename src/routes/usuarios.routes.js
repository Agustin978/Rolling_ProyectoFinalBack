import { Router } from 'express';
import { check } from 'express-validator';
import { creaUsuario, editaUsuario, login, obtenerUsuario, obtenerUsuarios } from '../controllers/usuarios.controllers';

const router = Router();

router.route('/usuarios/:id')
      .get(obtenerUsuario)  //Para la busqueda de un usuario por id
      .put([
        check('nombreUsuario')
            .notEmpty()
            .withMessage('El nombre de usuario es un campo obligatorio')
            .isLength({min: 4, max: 14})
            .withMessage('El nombre de usuario debe contener entre 4 y 14 caracteres'),
        check('email')
            .notEmpty()
            .withMessage('El campo del email es obligatorio')
            .isLength({min:8,max:40})
            .withMessage('El campo de email debe contener como minimo 8 caracteres y como maximo 40 caracteres')
            .isEmail()
            .withMessage('El email proporcionado no es valido. Ingrese una direccion de email valida'),
        check('password')
            .notEmpty()
            .withMessage('El campo de contraseña es obligatorio.')
            .isLength({min: 6, max: 100})
            .withMessage('El campo de contraseña debe tener como minimo 6 caracteres y como maximo 15 caracteres.')
            .matches(/^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-z]).{6,}$/)
            .withMessage('La contraseña ingresada no es valida.'),
        check('type')
            .notEmpty()
            .withMessage('No se como pero hiciste que el tipo de usuario este vacio. El usuario debe tener algun tipo.')
      ], editaUsuario); 

router.route('/usuarios')
      .get(obtenerUsuarios)  //Para obtener todos los usuarios almacenados en la bd
      .post([
        check('email')
            .notEmpty()
            .withMessage('El campo del email es obligatorio')
            .isLength({min: 8, max: 40})
            .withMessage('El campo de email debe contener como minimo 8 caracteres y como maximo 40 caracteres')
            .isEmail()
            .withMessage('El email proporcionado no es valido. Ingrese una direccion de email valida'),
        check('password')
            .notEmpty()
            .withMessage('El campo de contraseña es obligatorio.')
            .isLength({min: 6, max: 100})
            .withMessage('El campo de contraseña debe tener como minimo 6 caracteres y como maximo 15 caracteres.')
            .matches(/^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-z]).{6,}$/)
            .withMessage('La contraseña ingresada no es valida.')
      ], login); 

router.route('/usuariosnuevo')
      .post([
        check('nombreUsuario')
            .notEmpty()
            .withMessage('El nombre de usuario es un campo obligatorio')
            .isLength({min: 4, max: 14})
            .withMessage('El nombre de usuario debe contener entre 4 y 14 caracteres'),
        check('email')
            .notEmpty()
            .withMessage('El campo del email es obligatorio')
            .isLength({min:8,max:40})
            .withMessage('El campo de email debe contener como minimo 8 caracteres y como maximo 40 caracteres')
            .isEmail()
            .withMessage('El email proporcionado no es valido. Ingrese una direccion de email valida'),
        check('password')
            .notEmpty()
            .withMessage('El campo de contraseña es obligatorio.')
            .isLength({min: 6, max: 100})
            .withMessage('El campo de contraseña debe tener como minimo 6 caracteres y como maximo 15 caracteres.')
            .matches(/^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-z]).{6,}$/)
            .withMessage('La contraseña ingresada no es valida.'),
        check('type')
            .notEmpty()
            .withMessage('No se como pero hiciste que el tipo de usuario este vacio. El usuario debe tener algun tipo.')
      ], creaUsuario); //Para ingresar nuevos usuarios

export default router;