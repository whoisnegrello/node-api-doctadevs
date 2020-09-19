const Model = require("./model");

async function getPosts() {
    // return posts;
    try {
        const res = await Model.find({});
        return res;
    } catch (e) {
        console.log(e);
    }
}

async function getPost(postID) {
    try {
        const res = await Model.find({ id: postID });
        return res;
    } catch (e) {
        console.log(e);
    }
}

async function addPost(post) {
    const postNuevo = new Model(post);
    try{
        const res = await postNuevo.save();
        return res;
    } catch (e) {
        console.log(e);
    }
}


async function editPost(postID, propiedad, valorNuevo) {
    try {
        let nuevaInfo = {};
        nuevaInfo[propiedad] = valorNuevo;
        const res = await Model.updateOne(
            {
                id: postID
            },
            nuevaInfo
        );
        return res;
    } catch (e) {
        console.log(e);
    }
}

async function removePost(postID) {
    try {
        const res = await Model.deleteOne({ autor: 'Cata' });
        return res.deletedCount;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    editPost,
    removePost,
};
