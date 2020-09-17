const store = require("./store");

function getPosts() {
    return new Promise((resolve, reject) =>{
        resolve(store.getPosts());
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

module.exports = {
    getPosts,
    addPost,
};
