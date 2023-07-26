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