const { error } = require('./response');

function errors(err, req, res, next) {
    console.error(err.description || '[response error]', err);
    error(req, res, err.message, err.statusCode);
}

module.exports = errors;