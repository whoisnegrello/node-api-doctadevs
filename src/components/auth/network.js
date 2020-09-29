const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/', function(req, res) {
    controller.login(req.body.username, req.body.password)
    .then(messageList => {
        return response.success(req, res, messageList, 200);
    })
    .catch(e => {
        return response.error(req, res, 'Informacion invalida', 400, 'Error en el controlaor');
    });
});

module.exports = router;
