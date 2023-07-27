import { Router } from 'express';
import { check } from 'express-validator';
import { crearProducto, obtenerProducto, obtenerProductos } from '../controllers/productos.controllers';

const router = Router();

router.route('/productos')
      .get(obtenerProductos)
      .post([
        check('nombreProducto')
            .notEmpty()
            .withMessage('El nombre del producto es un campo obligatorio')
            .isLength({ min: 2, max: 200 })
            .withMessage('El nombre del producto debe contener entre 2 y 200 caracteres'),
        check('imagen')
            .notEmpty()
            .withMessage('La imagen es obligatoria')
            .matches(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)$/)
            .withMessage('La imagen debe ser un enlace y de tipo jpg o gif o png o webp'),
        check('precioNuevo')
            .notEmpty()
            .withMessage('El precio del producto es obligatorio.')
            .isInt({ min: 50, max: 10000 })
            .withMessage('El precio debe ser un número entre 50 y 10000'),
        check('precioAnterior')
            .optional({ nullable: true }) 
            .isInt({ min: 50, max: 10000 })
            .withMessage('El precio anterior debe ser un número entre 50 y 10000'),
        check('descripcion')
            .notEmpty()
            .withMessage('La descripción del producto es obligatoria')
            .isLength({ min: 10, max: 10000 })
            .withMessage('La descripción del producto debe contener entre 10 y 10000 caracteres'),
        check('categoria')
            .notEmpty()
            .withMessage('La categoría es obligatoria')
            .isIn([
              'bebida caliente',
              'bebida fria',
              'bebida con alcohol',
              'entrada',
              'plato fuerte',
              'acompaniamientos',
              'postre',
            ])
            .withMessage('Categoría no válida, seleccione una opción válida.')
      ], crearProducto); 

export default router;
