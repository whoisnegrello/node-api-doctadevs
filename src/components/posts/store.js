const { Promise } = require("mongoose");
const Model = require("./model");
const User = require("../users/model");
const { err } = require('../../utils');

function listPosts() {
    return new Promise(function(resolve, reject){
        Model.find({})
        .populate('autor', 'username')
        .then(res => resolve(res))
        .catch(error => reject(err("[data error]", error.message, error.statusCode)))
    });
}

function getPost(postID) {
    return new Promise(function(resolve, reject){
        Model.find({ _id: postID })
        .populate('autor', 'username')
        .then(res => {
            if (res !== null) {
                return resolve(res);
            } else {
                return reject(err("[data error]", "Este usuario no existe", 404));
            }
        })
        .catch(error => reject(err("[data error]", error.message, error.statusCode)));
    });
}

function addPost(post) {
    return new Promise(function(resolve, reject){
        User.findOne({ username: post.autor })
        .populate('users')
        .then(populated => {
            if (populated === null) return reject(err("[data error]", "Este usuario no existe", 404));

            const postNuevo = new Model({
                autor: populated,
                mensaje: post.mensaje,
                fecha: Date.now(),
                likes: []
            });

            postNuevo.save()
            .then(res => resolve(res))
            .catch(error => reject(err("[data error]", error.message, error.statusCode)))
        })
        .catch(error => reject(err("[data error]", error.message, error.statusCode)));
    });
}

function likePost(postID, username) {
    return new Promise(function(resolve, reject){
        Model.findOne({ _id: postID })
        .then(postObject => {
            if (postObject === null) return reject(err("[data error]", "Este post no existe", 404));

            User.findOne({ username: username })
            .then(recoverUser => {
                if (recoverUser === null) return reject(err("[data error]", "Este usuario no existe", 404));
                const posLike = postObject.likes.findIndex(like => like.toString() == recoverUser._id.toString());

                let message;
                if (posLike === -1) {
                    postObject.likes.push(recoverUser._id)
                    message = "Le diste like al post";
                } else {
                    postObject.likes.splice(posLike, 1);
                    message = "Retiraste tu like del post";
                }

                Model.updateOne({ _id: postID }, postObject)
                .then(writeOpResult => {
                    if (writeOpResult.nModified === 0) reject(err("[data error]", "No se pudo dar like", 404));
                    return resolve(message);
                })
                .catch(error => reject(err("[data error]", error.message, error.statusCode)))
            })
            .catch(error => reject(err("[data error]", error.message, error.statusCode)))
        })
        .catch(error => reject(err("[data error]", error.message, error.statusCode)));
    });
}

function editPost(postID, propiedad, valorNuevo) {
    return new Promise(function(resolve, reject){
        let nuevaInfo = {};
        nuevaInfo[propiedad] = valorNuevo;
        Model.updateOne({_id: postID}, nuevaInfo)
        .then(writeOpResult => {
            if (writeOpResult.nModified === 0) reject(err("[data error]", "No se modificó el post", 404));
            return resolve(`Se modificó ${writeOpResult.nModified} post con éxito`)
        })
        .catch(error => reject(err("[data error]", error.message, error.statusCode)))
    });
}

function removePost(postID) {
    return new Promise(function(resolve, reject){
        Model.deleteOne({ _id: postID })
        .then(res => resolve("Post eliminado con éxito"))
        .catch(error => reject(err("[data error]", error.message, error.statusCode)))
    });
}

module.exports = {
    listPosts,
    getPost,
    addPost,
    editPost,
    removePost,
    likePost,
};
