const routerAuth = require('../components/auth/network');
const routerPosts = require('../components/posts/network');
const routerUsers = require('../components/users/network');

const routes = function (server) {
    server.use('/login', routerAuth);
    server.use('/posts', routerPosts);
    server.use('/users', routerUsers);
}

module.exports = routes;