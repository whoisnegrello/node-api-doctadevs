const { Promise } = require("mongoose");
const bcrypt = require("bcrypt");
const Model = require("./model");
const Post = require("../posts/model");
const Auth = require("../auth/model");
const { err } = require('../../utils');

function listUsers() {
    return new Promise(function(resolve, reject){
        Model.find({})
        .then(res => resolve(res))
        .catch(error => {
            throw reject(err("[data error]", error.message, error.statusCode))
        })
    });
}

function getUser(username) {
    return new Promise(function(resolve, reject){
        Model.findOne({ username: username })
        .then(res => {
            if (res !== null) {
                resolve(res);
            } else {
                throw reject(err("[data error]", "Este usuario no existe", 404));
            }
        })
        .catch(e => resolve(e))
    });
}

function addUser(user) {
    return new Promise(async function(resolve, reject){
        checkFirstUser(user)
        .then(res => {
            user = res;
            Model.findOne({ username: user.username })
            .then(res => {
                if (res !== null) return reject(err("[data error]", "Este username ya existe", 403));

                bcrypt.hash(user.password, 10)
                .then(hash => {
                    user.password = hash;
                    const userNuevo = new Model(user);

                    userNuevo.save()
                    .then(res => {
                        let userAuth = {
                            username: user.username,
                            password: hash,
                            role: user.role,
                        };
                        const newAuth = new Auth(userAuth);
                        return newAuth.save()
                    })
                    .then(res => resolve(res))
                    .catch(error => {
                        throw reject(err("[data error]", "Error al guardar los datos del usuario", 500))
                    })
                })
                .catch(error => {
                    throw reject(err("[hash error]", error.message, 500))
                })
            })
        })
    });
}

function editUser(username, propiedad, valorNuevo) {
    let nuevoUsuario = {};
    nuevoUsuario[propiedad] = valorNuevo;
    return new Promise(function(resolve, reject){
        let nuevaInfo = {};
        nuevaInfo[propiedad] = valorNuevo;

        Model.updateOne({username: username}, nuevaInfo)
        .then(writeOpResult => {
            if (writeOpResult.nModified === 0) {
                throw reject(err("[data error]", "Hubo un problema para actualizar el usuario", 500));
            } else {
                return resolve("Se actualizaron los datos con éxito")
            }
        })
        .catch(error => reject(err("[data error]", "Hubo un problema para actualizar el usuario", 500)))
    });
}

function removeUser(username) {
    return new Promise(function(resolve, reject){
        Model.findOne({ username: username })
        .then(res => {
            if (res.length < 1) {
                return reject(err("[data error]", "Este usuario no existe", 500))
            }
            return res;
        })
        .then(res => Post.deleteMany({autor: res._id}))
        .then(res => Model.deleteOne({ username: username }))
        .then(res => Auth.deleteOne({ username: username }))
        .then(res => resolve("Usuario y contenidos eliminados con éxito."))
        .catch(error => reject(err("[data error]", "Hubo un problema para eliminar el usuario", 500)))
    });
}

function checkFirstUser(user) {
    return new Promise(function(resolve, reject){
        Model.find({})
        .then(res => {
            if(res.length === 0){
                user.role = 'admin';
            } else {
                user.role = 'subscriber';
            }
            return resolve(user);
        })
        .catch(error => reject(err("[data error]", error.message, error.statusCode)))
    });
}

module.exports = {
    listUsers,
    getUser,
    addUser,
    editUser,
    removeUser,
};
