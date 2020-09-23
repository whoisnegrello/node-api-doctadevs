const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    {
        id: Number,
        usuario: String,
        posts: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Post',
        }],
        password: String,
    }
);

module.exports = User;