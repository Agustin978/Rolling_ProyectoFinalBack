import { Router } from "express";
import { check } from "express-validator";
import {
  borrarPedido,
  creaPedido,
  editarPedido,
  obtenerPedido,
  obtenerPedidos,
} from "../controllers/pedidos.controllers";

const router = Router();

router.route("/pedidos").get(obtenerPedidos).put(editarPedido);
router
  .route("/pedidos/:id")
  .get(obtenerPedido)
  .put(
    [
      check("idProducto")
        .notEmpty()
        .withMessage("El id del producto es necesario"),
      check("nombreUsuario")
        .notEmpty()
        .withMessage(
          "El nombre de usuario es obligatorio para almacenar el pedido"
        )
        .isLength({ min: 4, max: 14 })
        .withMessage(
          "El nombre de usuario debe contener entre 4 y 14 caracteres"
        ),
      check("email")
        .notEmpty()
        .withMessage("El campo del email es obligatorio")
        .isLength({ min: 8, max: 40 })
        .withMessage(
          "El campo de email debe contener como minimo 8 caracteres y como maximo 40 caracteres"
        )
        .isEmail()
        .withMessage(
          "El email proporcionado no es valido. Ingrese una direccion de email valida"
        ),
      check("nombreProducto")
        .notEmpty()
        .withMessage(
          "El nombre del producto es obligatorio para almacenar el pedido"
        )
        .isLength({ min: 2, max: 200 })
        .withMessage(
          "El nombre del producto debe contener entre 2 y 200 caracteres"
        ),
      check("precioUnidad")
        .notEmpty()
        .withMessage("El precio es necesario para almacenar el pedido")
        .isNumeric()
        .withMessage("El valor ingresado debe de ser numerico")
        .isFloat({ min: 50, max: 10000 })
        .withMessage("El precio debe estar entre 50 y 10000"),
      check("fechaPedido")
        .notEmpty()
        .withMessage("La fecha en que se realizo el pedido es obligatoria"),
      check("cantidad")
        .notEmpty()
        .withMessage("La cantidad es necesaria para almacenar el pedido")
        .isNumeric()
        .withMessage("El valor ingresado debe de ser numerico")
        .isFloat({ min: 1, max: 50 })
        .withMessage(
          "La cantidad minima que se puede pedir es 1 y la maxima de 50"
        ),
      check("direccion")
        .notEmpty()
        .withMessage(
          "La direccion a la que se debe realizar el pedido es obligatoria"
        )
        .isLength({ min: 5, max: 100 })
        .withMessage(
          "La direccion tiene un minimo de 5 y un maximo de 100 caracteres"
        ),
      check("estado")
        .notEmpty()
        .withMessage("El estado en que esta el pedido es obligatorio"),
    ],
    editarPedido
  )
  .delete(borrarPedido);

router
  .route("/pedidosnuevo")
  .post(
    [
      check("idProducto")
        .notEmpty()
        .withMessage("El id del producto es necesario"),
      check("nombreUsuario")
        .notEmpty()
        .withMessage(
          "El nombre de usuario es obligatorio para almacenar el pedido"
        )
        .isLength({ min: 4, max: 14 })
        .withMessage(
          "El nombre de usuario debe contener entre 4 y 14 caracteres"
        ),
      check("email")
        .notEmpty()
        .withMessage("El campo del email es obligatorio")
        .isLength({ min: 8, max: 40 })
        .withMessage(
          "El campo de email debe contener como minimo 8 caracteres y como maximo 40 caracteres"
        )
        .isEmail()
        .withMessage(
          "El email proporcionado no es valido. Ingrese una direccion de email valida"
        ),
      check("nombreProducto")
        .notEmpty()
        .withMessage(
          "El nombre del producto es obligatorio para almacenar el pedido"
        )
        .isLength({ min: 2, max: 200 })
        .withMessage(
          "El nombre del producto debe contener entre 2 y 200 caracteres"
        ),
      check("precioUnidad")
        .notEmpty()
        .withMessage("El precio es necesario para almacenar el pedido")
        .isNumeric()
        .withMessage("El valor ingresado debe de ser numerico")
        .isFloat({ min: 50, max: 10000 })
        .withMessage("El precio debe estar entre 50 y 10000"),
      check("fechaPedido")
        .notEmpty()
        .withMessage("La fecha en que se realizo el pedido es obligatoria"),
      check("cantidad")
        .notEmpty()
        .withMessage("La cantidad es necesaria para almacenar el pedido")
        .isNumeric()
        .withMessage("El valor ingresado debe de ser numerico")
        .isFloat({ min: 1, max: 50 })
        .withMessage(
          "La cantidad minima que se puede pedir es 1 y la maxima de 50"
        ),
      check("direccion")
        .notEmpty()
        .withMessage(
          "La direccion a la que se debe realizar el pedido es obligatoria"
        )
        .isLength({ min: 5, max: 100 })
        .withMessage(
          "La direccion tiene un minimo de 5 y un maximo de 100 caracteres"
        ),
      check("estado")
        .notEmpty()
        .withMessage("El estado en que esta el pedido es obligatorio"),
    ],
    creaPedido
  );

export default router;
