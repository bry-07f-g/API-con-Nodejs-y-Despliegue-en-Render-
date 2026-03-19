const mongoose = require('mongoose');

const dbConnection = () => {
    try {

        mongoose.connect(process.env.MONGODB_CNN);
        console.log('Datos en linea');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
}

module.exports = {
    dbConnection
}