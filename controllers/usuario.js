const {response} = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../modules/usuario');

const usuariosGet = async(req, res = response) => {
    const body = req.query;

    const {q, nombre, page= 1, limit} = req.query;

    const usuarios = await Usuario.find();

    res.json({
        usuarios
    });
}

const PromGet = async (req, res = response) => {
    const body = req.query;

    const {q, nombre, page= 1, limit} = req.query;

    const usuarios = await Usuario.find();

    usuarios.forEach(numero => console.log(numero));

    res.json({
        msg: 'Prom API controlador',

        q,
        nombre,
        page,
        limit,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {
    const body = req.body;

    let msg = '';

    const usuario = new Usuario(body);

    const {nombre, email, password, rol, estado} = req.body;

    try {

        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        msg = 'Usuario creado correctamente';
    } catch (error) {
        console.error(error);

        if (error) {
            if (error.name === 'ValidationError') {
                console.error(Object.values(error.errors).map(val => val.message));
                msg = Object.values(error.errors).map(val => val.message);
            }
        }
    }

    console.log(msg);

    res.json({
        msg: msg
    });
}

const usuariosPut = async(req, res = response) => {
    const body = req.query;

    console.log(body);

    const {nombre, email, password, rol, estado} = req.body;

    const usuario = await Usuario.findOneAndUpdate({email: email}, {nombre: nombre, rol: rol});

    res.json({
        msg: 'Usuario Modificado',

        usuario
    });
}

const usuarioDelete = async (req, res = response) => {
    const body = req.query;

    console.log(body);

    const {nombre, email, password, rol, estado} = req.query;
    
    const usuario = await Usuario.findOneAndDelete({email: email});

    res.json({
        msg: 'Usuario Eliminado',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuarioDelete,
    PromGet
}