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
            const errors = validationResult(req);
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

export const login = async (req, res) => 
{
    try
    {
        const {email, password} = req.body;
        let usuario = await Usuario.findOne({email: email});
        const errors = validationResult(req);
        if(!errors.isEmpty()) //En caso que hayan errores
        {
            return res.status(400).json(
                {
                    error: errors.array()
                }
            );
        }
        if(!usuario)
        {
            return res.status(400).json(
                {
                    mensaje: 'Correo o password incorrectos.'
                }
            );
        }
        const passwordEncriptada = bcrypt.compareSync(password, usuario.password);
        if(!passwordEncriptada)
        {
            return res.status(400).json(
                {
                    mensaje: 'Correo o password incorrectos.'
                }
            );
        }else
        {
            res.status(200).json(
                {
                    mensaje: 'Usuario existente',
                    uid: usuario._id,
                    nombreUsuario: usuario.nombreUsuario,
                    type: usuario.type,
                    email: usuario.email
                }
            )
        }
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al intentar loguearse.'
        });
    }
}

export const editaUsuario = async (req, res) => 
{
    try
    {
        const errors = validationResult(req);
        console.log(req.body);
        if(!errors.isEmpty())
        {
            return res.status(400).json(
                {
                    error: errors.array()
                }
            )
        }
        await Usuario.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(
            {
                mensaje: 'El usuario fue editado correctamente'
            }
        )
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(404).json({
            mensaje: 'Error, el usuario no pudo ser editado.'
        });
    }
}

export const borrarUsuario = async (req, res) =>
{
    try
    {
        const usuario = await Usuario.findById(req.params.id);
        if(!usuario)
        {
            return res.status(400).json(
            {
                mensaje: 'El usuario con id "'+req.params.id+'" no se encontro en la base de datos'
            });
        }
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json(
            {
                mensaje: 'El usuario fue eliminado exitosamente.'
            }
        )
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(404).json({
            mensaje: 'Error al eliminar el usuario con id "'+req.params.id+'" de la base de datos.'
        });
    }
}