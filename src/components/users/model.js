const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    {
        id: Number,
        usuario: String,
        contraseña: String,
        email: String
    }
);

module.exports = User;