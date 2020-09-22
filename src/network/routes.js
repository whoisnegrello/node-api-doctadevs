const routerPosts = require('../components/posts/network');
const routerUsers = require('../components/users/network');

const routes = function (server) {
    server.use('/posts', routerPosts);
    server.use('/users', routerUsers);
}

module.exports = routes;