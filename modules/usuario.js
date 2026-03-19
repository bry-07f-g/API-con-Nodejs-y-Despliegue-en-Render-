const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [3, 'La contraseña debe tener al menos 3 caracteres'],
        maxlength: [60, 'La contraseña no debe exceder los 7 caracteres: {VALUE}'],
    },

    rol: {
        type: String,
        required: true,
        enum: ['admin', 'Usuario']
    },

    estado: {
        type: Boolean,
        default: true,
        required: [true, 'el estado es obligatorio']
    }
});

module.exports = model('Usuario', UsuarioSchema);