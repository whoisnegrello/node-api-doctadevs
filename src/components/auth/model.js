const mongoose = require('mongoose');

const Auth = mongoose.model(
    'Auth',
    {
        id: String,
        username: String,
        password: String,
        role: String,
    }
);

module.exports = Auth;
