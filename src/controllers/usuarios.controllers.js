import { validationResult } from "express-validator";
import Usuario from "../models/usuario";
import bcrypt from 'bcrypt';

export const obtenerUsuario = async (req, res) =>
{
    try
    {
        const usuario = await Usuario.findById(req.params.id);
        res.status(200).json(usuario);
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al buscar el usuario con id: '+req.params.id+' en la base de datos.'
        });
    }
}

export const obtenerUsuarios = async (req, res) =>
{
    try
    {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al buscar los usuarios en la base de datos.'
        });
    }
}

export const creaUsuario = async (req, res) => 
{
    try
    {
        //Primero controlo que el usuario no se encuentre ya ingresado
        const {email, password} = req.body;
        const {nombreUsuario} = req.body;
        let usuarioMail = await Usuario.findOne({email: email});
        let usuarioNombre = await Usuario.findOne({nombreUsuario: nombreUsuario});
        if(usuarioMail) //Si existe ya un usuario con la direccion de mail ingresada
        {
            return res.status(400).json(
                {
                    mensaje: 'El mail ingresado ya esta registrado.'
                }
            );
        }else if(usuarioNombre)
        {
            return res.status(400).json(
                {
                    mensaje: 'El nombre de usuario ingresado ya esta registrado.'
                }
            );
        }else
        {
            const errors = validationResult(req.body);
            if(!errors.isEmpty()) //En caso que hayan errores
            {
                return res.status(400).json(
                    {
                        error: errors.array()
                    }
                );
            }

            const usuarioNuevo = new Usuario(req.body); //Se crea el nuevo usuario
            //Debo de encriptar la contraseña del nuevo usuario
            const salt = bcrypt.genSaltSync(10); //Indico la cantidad de veces que el algoritmo se ejecutara sobre la contraseña
            usuarioNuevo.password = bcrypt.hashSync(password, salt); //Se encripta la contraseña
            await usuarioNuevo.save();
            res.status(201).json(
                {
                    mensaje: 'El nuevo usuario fue almacenado exitosamente.',
                    nombre: usuarioNuevo.nombreUsuario,
                    uid: usuarioNuevo._id
                }
            )
        }
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al intentar ingresar el nuevo usuario en la base de datos.'
        });
    }
}