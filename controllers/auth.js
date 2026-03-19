const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

const login = async(req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    try{
        if( !usuario ){
            return res.status(400).json({
                msg: 'Correo electronico no encontrado'
            })
        }

        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })
        }
        resultado = await comparePassword(password, usuario.password)

        if( resultado == true ){
            return res.status(400).json({
                msg: 'Contraseña correcta'
            })
        } 
        
        else {
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
            })
        }
        } catch (err) {
        return res.status(400).json({
            msg: 'Apreciado ususario conatcte al administrador'
        })
    }
}

module.exports = {
    login
}