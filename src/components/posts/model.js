const mongoose = require('mongoose');

const Post = mongoose.model(
    'Post',
    {
        id: Number,
        autor: String,
        mensaje: String,
        fecha: Date
    }
);

module.exports = Post;
