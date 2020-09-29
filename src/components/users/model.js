const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    {
        id: Number,
        name: String,
        username: String,
        posts: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Post',
        }],
        password: String,
    }
);

module.exports = User;
