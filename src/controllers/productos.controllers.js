import { validationResult } from 'express-validator';
import Producto from '../models/productos';

export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    console.log('Ocurrió un error al intentar comunicarse con la base de datos. Info de error: ' + error);
    res.status(400).json({
      mensaje: 'Error al buscar el producto con id: ' + req.params.id + ' en la base de datos.',
    });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.log('Ocurrió un error al intentar comunicarse con la base de datos. Info de error: ' + error);
    res.status(400).json({
      mensaje: 'Error al buscar los productos en la base de datos.',
    });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { nombreProducto, imagen, precioNuevo, precioAnterior, descripcion, categoria } = req.body;
    const productoNuevo = new Producto({
      nombreProducto,
      imagen,
      precioNuevo,
      precioAnterior,
      descripcion,
      categoria,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    await productoNuevo.save();
    res.status(201).json({
      mensaje: 'El nuevo producto fue almacenado exitosamente.',
      nombreProducto: productoNuevo.nombreProducto,
      uid: productoNuevo._id,
    });
  } catch (error) {
    console.log('Ocurrió un error al intentar comunicarse con la base de datos. Info de error: ' + error);
    res.status(400).json({
      mensaje: 'Error al intentar ingresar el nuevo producto en la base de datos.',
    });
  }
};


export const borrarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(400).json({
        mensaje: 'El producto con id "' + req.params.id + '" no se encontró en la base de datos',
      });
    }

    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: 'El producto fue eliminado exitosamente.',
    });
  } catch (error) {
    console.log('Ocurrió un error al intentar comunicarse con la base de datos. Info de error: ' + error);
    res.status(404).json({
      mensaje: 'Error al eliminar el producto con id "' + req.params.id + '" de la base de datos.',
    });
  }
};

export const editarProducto = async (req, res) => {
  try
  {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
      return res.status(400).json(
        {
          error: errors.array()
        }
      );
    }
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(
      {
        mensaje: 'El producto fue editado exitosamente.'
      }
    )
  }catch(error)
  {
      console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
      res.status(404).json({
          mensaje: 'Error, el producto no pudo ser editado.'
      });
  }
}