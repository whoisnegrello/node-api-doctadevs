const store = require("./store");

function listPosts() {
    return store.listPosts();
}

function getPost(postID) {
    return store.getPost(postID);
}

function addPost(post) {
    return store.addPost(post);
}

function likePost(post, username) {
    return store.likePost(post, username);
}

function editPost(postID, propiedad, valorNuevo) {
    return store.editPost(postID, propiedad, valorNuevo);
}

function removePost(postID) {
    return store.removePost(postID);
}

module.exports = {
    listPosts,
    getPost,
    addPost,
    editPost,
    removePost,
    likePost,
};
