const Model = require("./model");

function getPosts() {
    // try {
    //     const res = await Model.find({});
    //     return res;
    // } catch (e) {
    //     console.log(e);
    // }
    return Model.find({});
}

function getPost(postID) {
    // try {
    //     const res = await Model.find({ id: postID });
    //     return res;
    // } catch (e) {
    //     console.log(e);
    // }
    return Model.find({ id: postID });
}

function addPost(post) {
    // try{
    //     const res = await postNuevo.save();
    //     return res;
    // } catch (e) {
    //     console.log(e);
    // }
    const postNuevo = new Model(post);
    return postNuevo.save();
}


function editPost(postID, propiedad, valorNuevo) {
    // try {
    //     let nuevaInfo = {};
    //     nuevaInfo[propiedad] = valorNuevo;
    //     const res = await Model.updateOne(
    //         {
    //             id: postID
    //         },
    //         nuevaInfo
    //     );
    //     return res;
    // } catch (e) {
    //     console.log(e);
    // }
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
    // try {
    //     const res = await Model.deleteOne({ autor: 'Cata' });
    //     return res.deletedCount;
    // } catch (e) {
    //     console.log(e);
    // }
    return Model.deleteOne({ id: postID });
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    editPost,
    removePost,
};
