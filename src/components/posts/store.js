const Model = require("./model");

function listPosts() {
    return Model.find({});
}

function getPost(postID) {
    return Model.find({ id: postID });
}

function addPost(post) {
    const postNuevo = new Model(post);
    return postNuevo.save();
}


function editPost(postID, propiedad, valorNuevo) {
    let nuevaInfo = {};
    nuevaInfo[propiedad] = valorNuevo;
    return Model.updateOne(
        {
            id: postID
        },
        nuevaInfo
    );
}

function removePost(postID) {
    return Model.deleteOne({ id: postID });
}

module.exports = {
    listPosts,
    getPost,
    addPost,
    editPost,
    removePost,
};
