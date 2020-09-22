const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/', function (req, res) {
    controller.listUsers()
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.get('/:userID', function (req, res) {
    controller.getUser(req.params.userID)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});
router.post('/', function (req, res) {
    controller.addUser(req.body)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlaor');
        });
});

router.patch('/:userID', function (req, res) {
    controller.editUser(req.params.userID, req.body.propiedad, req.body.valor)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlaor');
        });
});

router.delete('/:userID', function (req, res) {
    controller.removeUser(req.params.userID)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlaor');
        });
});

module.exports = router;