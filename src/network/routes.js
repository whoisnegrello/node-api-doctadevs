const routerPosts = require('../components/posts/network');

const routes = function (server) {
    server.use('/posts', routerPosts);
}

module.exports = routes;