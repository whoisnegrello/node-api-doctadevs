const mongoose = require('mongoose');

const Auth = mongoose.model(
    'Auth',
    {
        id: String,
        username: String,
        password: String,
    }
);

module.exports = Auth;
