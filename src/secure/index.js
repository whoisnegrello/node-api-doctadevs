const jwt = require('jsonwebtoken');
const config = require('../config');
const { err } = require('../utils');
const User = require('../components/users/controller');

const check = {
    public: function (req) {
        return true;
    },
    user: function (req, owner) {
        decodeHeader(req);
    },
    own: function (req, owner) {
        const decoded = decodeHeader(req);

        if (decoded.user !== owner) {
            throw err("[verify error]", 'No tenés permiso para acceder a esta ruta.', 403);
        }
    },
    admin: async function (req) {
        try {
            const decoded = await decodeHeader(req);

            if (decoded.role !== 'admin') {
                throw err("[verify error]", 'No tenés permiso para acceder a esta ruta.', 403);
            }
        } catch (error) {
            throw err("[verify error]", 'No tenés permiso para acceder a esta ruta.', 403);
        }
    },
}

function sign(data) {
    return jwt.sign(data, config.jwt.secret, { expiresIn: 3600 });
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || null;
    try {
        const token = getToken(authorization);
        const decoded = verify(token);
        req.user = decoded;

        return User.getUser(decoded.user);
    } catch (error) {
        throw err(error.description, error.message, error.statusCode);
    }
}

function verify(token) {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch(error) {
        throw err("[verify error]", error.message, 403);
    }
}

function getToken(header) {
    if (!header) {
        throw err("[authorization error]", "El header Authorization está vacío", 404);
    }

    if (header.indexOf('Bearer') === -1) {
        throw err("[authorization error]", "El header Authorization no contiene 'Bearer'", 404);
    }

    return header.split(' ')[1] || null;
}

module.exports = {
    sign,
    check,
};
