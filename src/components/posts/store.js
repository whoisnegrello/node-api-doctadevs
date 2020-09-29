const Model = require("./model");
const User = require("../users/model");

function listPosts() {
    return new Promise(function(resolve, reject){
        Model.find({})
        .populate('autor')
        .exec(function (error, posts) {
            if (error) {
                console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                return reject("Hubo un problema para buscar los posts.");
            }

            if (posts === null){
                console.error("[error] La DB no arrojó ningún resultado.");
                return reject("Hubo un problema para buscar los posts.");
            }

            resolve(posts);
        });
    });
}

function getPost(postID) {
    return new Promise(function(resolve, reject){
        Model.findOne({ id: postID })
        .populate('autor')
        .exec(function (error, post) {
            if (error) {
                console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                return reject("Hubo un problema para buscar el post.");
            }

            if (post === null){
                console.error("[error] La DB no arrojó ningún resultado.");
                return reject("No existe ningún post con ese ID.");
            }

            resolve(post);
        });
    });
}

function addPost(post) {
    return new Promise(function(resolve, reject){
        User
        .findOne({ id: post.autor })
        .populate('users')
        .exec((err, populated) => {
            if (err || populated === null) {
                reject("No existe el usuario o algo salió mal.")
            }

            const postNuevo = new Model({
                id: post.id,
                mensaje: post.mensaje,
                autor: populated
            });
            postNuevo.save()
            .then(function(res){
                User.updateOne({id: res.autor.id}, {$push: {posts: [res._id]}}, function(error, writeOpResult){
                    if (error) {
                        console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                        return reject("Hubo un problema para publicar el post.");
                    }

                    if (writeOpResult.nModified < 1) {
                        removePost(post.id);
                        console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                        return reject("Hubo un problema para publicar el post.");
                    }

                    resolve(res);
                })
            })
        });
    });
}


function editPost(postID, propiedad, valorNuevo) {
    return new Promise(function(resolve, reject){
        let nuevaInfo = {};
        nuevaInfo[propiedad] = valorNuevo;
        return Model.updateOne({id: postID}, nuevaInfo, function(error, writeOpResult){
            if (error) {
                console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                return reject("Hubo un problema para actualizar el post.");
            }
            return resolve(writeOpResult);
        });
    });
}

function removePost(postID) {
    return new Promise(function(resolve, reject){
        Model.deleteOne({ id: postID }, function(error) {
            if (error) {
                console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                return reject("Hubo un problema para eliminar el post.");
            }
        });
        return resolve("Post eliminado con éxito.");
    });
}

module.exports = {
    listPosts,
    getPost,
    addPost,
    editPost,
    removePost,
};
