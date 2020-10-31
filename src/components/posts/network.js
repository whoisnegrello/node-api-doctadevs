const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const auth = require('./auth.middleware');

const router = express.Router();

router.get('/', auth('list'), list);
router.get('/:postID', auth('get'), get);
router.post('/', auth('add'), add);
router.post('/:postID/like', auth('like'), like);
router.patch('/:postID', auth('update', { owner: 'autor' }), update);
router.delete('/:postID', auth('remove', { owner: 'autor' }), remove);

function list(req, res, next) {
    controller.listPosts()
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(next)
}

function get(req, res, next) {
    controller.getPost(req.params.postID)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(next)
}
function add(req, res, next) {
    if(
        Object.keys(req.body).length === 0 && req.body.constructor === Object ||
        (!req.body.mensaje || !req.body.autor)
    ){
        return response.error(req, res, "La información enviada no es válida", 500);
    }
    controller.addPost(req.body)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(next);
}

function like(req, res, next) {
    controller.likePost(req.params.postID, req.user.user)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(next)
}

function update(req, res, next) {
    if(!req.body.propiedad || !req.body.valor){
        return response.error(req, res, "La información enviada no es válida", 500);
    }
    controller.editPost(req.params.postID, req.body.propiedad, req.body.valor)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(next);
}

function remove(req, res, next) {
    controller.removePost(req.params.postID)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(next);
}

module.exports = router;
