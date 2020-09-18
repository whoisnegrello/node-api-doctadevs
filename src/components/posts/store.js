let posts = [
    {
        "id": "100",
        "autor": "Lucho",
        "mensaje": "mensaje",
        "fecha": "2020-09-17"
    }
];

function getPosts() {
    return posts;
}

function getPost(postID) {
    let postSeleccionado = posts.find(function(post){
        return post.id == postID;
    });
    return postSeleccionado;
}

function addPost(post) {
    posts.push(post);
}

function editPost(postID, propiedad, valorNuevo) {
    posts = posts.filter(function(post){
        if (post.id == postID) {
            post[propiedad] = valorNuevo;
        }
        return post;
    })

}

function removePost(postID) {
    posts = posts.filter(function(post){
        return post.id != postID;
    })
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    editPost,
    removePost,
};