const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/', login);

function login(req, res) {
    if (!req.body.username || !req.body.password) {
        return response.error(req, res, "La información enviada no es válida", 500);
    }

    controller.login(req.body.username, req.body.password)
    .then(responseBody => {
        return response.success(req, res, responseBody, 200);
    })
    .catch(error => {
        return response.error(req, res, error.message, error.statusCode);
    });
}

module.exports = router;
