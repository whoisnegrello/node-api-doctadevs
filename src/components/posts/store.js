const posts = [];

function getPosts() {
    return posts;
}

function addPost(post) {
    posts.push(post);
}

module.exports = {
    getPosts,
    addPost,
};