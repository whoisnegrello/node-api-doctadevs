const store = require("./store");

function listPosts() {
    return new Promise((resolve, reject) =>{
        resolve(store.listPosts());
    });
}

function getPost(postID) {
    return new Promise((resolve, reject) =>{
        if (!postID) {
            reject("No ingresaste ningún ID de post.")
        }

        resolve(store.getPost(postID));
    });
}

function addPost(post) {
    return new Promise((resolve, reject) =>{
        if (!post) {
            reject("No ingresaste ningún contenido.")
        }

        resolve(store.addPost(post));
    });
}

function editPost(postID, propiedad, valorNuevo) {
    return new Promise((resolve, reject) =>{
        if (!postID || !propiedad || !valorNuevo ) {
            reject("No ingresaste algún elemento requerido.")
        }

        resolve(store.editPost(postID, propiedad, valorNuevo));
    });
}

function removePost(postID) {
    return new Promise((resolve, reject) =>{
        if (!postID) {
            reject("No ingresaste ningún contenido.")
        }

        resolve(store.removePost(postID));
    });
}

module.exports = {
    listPosts,
    getPost,
    addPost,
    editPost,
    removePost,
};
