const mongoose = require('mongoose');

const Post = mongoose.model(
    'Post',
    {
        id: Number,
        autor: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        mensaje: String,
        fecha: Date,
        likes: Number,
    }
);

module.exports = Post;
