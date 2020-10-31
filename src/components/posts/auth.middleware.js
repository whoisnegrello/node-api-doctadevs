const auth = require("../../secure");
const { err } = require('../../utils');
function checkAuth(action, options) {
    function middleware(req, res, next) {
        let owner = null;
        if (options && options.owner) {
            owner = req.params[options.owner] || req.body[options.owner];
        }

        try{
            switch(action) {
                case 'list':
                case 'get':
                    auth.check.public(req)
                    break;
                case 'add':
                case 'like':
                    auth.check.user(req)
                    break;
                case 'update':
                case 'remove':
                    try {
                        auth.check.admin(req);
                    } catch(error) {
                        try {
                            auth.check.own(req, owner);
                        } catch (error) {
                            throw err(error.description, error.message, error.statusCode);
                        }
                    }
                    break;
                default:
                    auth.check.admin(req);
                    break;
            }
            next();
        } catch (error) {
            throw err(error.description, error.message, error.statusCode);
        }
    }

    return middleware;
}

module.exports = checkAuth;
