const posts = require('../components/posts/network');
const users = require('../components/users/network');

const routes = function (server) {
    server.use('/posts', posts);
    server.use('/users', users);
}

module.exports = routes;