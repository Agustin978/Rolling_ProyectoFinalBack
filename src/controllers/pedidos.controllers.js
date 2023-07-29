import { validationResult } from "express-validator";
import Pedido from "../models/pedido";

export const obtenerPedidos = async(req, res) =>
{
    try
    {
        const pedidos = await Pedido.find();
        res.status(200).json(pedidos);
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al buscar los pedidos en la base de datos.'
        });
    }
}
export const obtenerPedido = async (req, res) =>
{
    try
    {
        const pedidos = await Pedido.findById(req.params.id);
        res.status(200).json(pedidos);
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al buscar los pedidos con id: '+req.params.id+' en la base de datos.'
        });
    }
}
export const creaPedido = async (req, res) =>
{
    try
    {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                error: errors.array()
            });
        }
        const pedidoNuevo = new Pedido(req.body);
        await pedidoNuevo.save();
        res.status(201).json({
            mensaje: 'El pedido se almaceno exitosamente.'
        })
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al ingresar el pedido en la base de datos.'
        });
    }
}
export const editarPedido = async (req, res) => 
{
    try
    {
        const errors = validationResult(req);
        //console.log(req.body);
        if(!errors.isEmpty())
        {
            return res.status(400).json(
                {
                    error: errors.array()
                }
            )
        }
        await Pedido.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(
            {
                mensaje: 'El pedido fue editado correctamente'
            }
        )
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(404).json({
            mensaje: 'Error, el pedido no pudo ser editado.'
        });
    }
}
export const borrarPedido = async (req, res) =>
{
    try
    {
        const pedido = await Pedido.findById(req.params.id);
       
        if(!pedido)
        {
            return res.status(400).json(
            {
                mensaje: 'El pedido con id "'+req.params.id+'" no se encontro en la base de datos'
            });
        }
      
        //console.log(req.params.id);
        await Pedido.findByIdAndDelete(req.params.id);
        res.status(200).json(
            {
                mensaje: 'El pedido fue eliminado exitosamente.'
            }
        )
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(404).json({
            mensaje: 'Error al eliminar el pedidos con id "'+req.params.id+'" de la base de datos.'
        });
    }
}