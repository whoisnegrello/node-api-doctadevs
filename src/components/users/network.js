const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const auth = require('./auth.middleware');

const router = express.Router();

router.get('/', auth('list'), list);
router.get('/:username', auth('get', { owner: 'username' }), get);
router.post('/', auth('add'), add);
router.patch('/:username', auth('update', { owner: 'username' }), update);
router.delete('/:username', auth('remove', { owner: 'username' }), remove);

function list (req, res, next) {
    controller.listUsers()
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(next)
}

function get (req, res, next) {
    controller.getUser(req.params.username)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(next)
}

function add (req, res, next) {
    if(
        Object.keys(req.body).length === 0 && req.body.constructor === Object ||
        (!req.body.username || !req.body.password)
    ){
        return response.error(req, res, "La información enviada no es válida", 500);
    }

    controller.addUser(req.body)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(next)
}

function update (req, res, next) {
    if(!req.body.propiedad || !req.body.valor){
        return response.error(req, res, "La información enviada no es válida", 500);
    }

    controller.editUser(req.params.username, req.body.propiedad, req.body.valor)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(next)
}

function remove (req, res, next) {
    controller.removeUser(req.params.username)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(next);
}

module.exports = router;