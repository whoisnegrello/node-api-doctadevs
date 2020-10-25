const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    {
        name: String,
        username: String,
        password: String,
        role: String,
    }
);

module.exports = User;
