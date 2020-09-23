const Model = require("./model");
const User = require("../users/model");

function listPosts() {
    return Model.find({});
}

function getPost(postID) {
    return Model.find({ id: postID });
}

function addPost(post) {
    User
    .findOne({ id: post.autor })
    .populate('users')
    .exec((err, populated) => {
        if (err || populated == null) {
            // console.log(err, populated);
            throw new Error("No existe el usuario o algo salió mal.")
        }
        const postNuevo = new Model({
            id: post.id,
            mensaje: post.mensaje,
            autor: populated
        });
        postNuevo.save()
        .then(function(res){
            return User.updateOne(
                {
                    id: res.autor.id
                },
                {
                    $push: { posts: [res._id] }
                }
            );
        })
    });
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
