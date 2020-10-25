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
    admin: function (req) {
        const decoded = decodeHeader(req);

        if (decoded.role !== 'admin') {
            throw err("[verify error]", 'No tenés permiso para acceder a esta ruta.', 403);
        }
    },
}

function sign(data) {
    return jwt.sign(data, config.jwt.secret, { expiresIn: 3600 });
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

function verify(token) {
    return jwt.verify(token, config.jwt.secret);
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || null;
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};
