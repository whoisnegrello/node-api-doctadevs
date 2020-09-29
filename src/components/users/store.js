const bcrypt = require("bcrypt");
const Model = require("./model");
const Auth = require("../auth/model");

function listUsers() {
    return new Promise(function(resolve, reject){
        resolve(Model.find({}));
    });
}

function getUser(userID) {
    return new Promise(function(resolve, reject){
        resolve(Model.findOne({ id: userID }));
    });
}

function addUser(user) {
    return new Promise(function(resolve, reject){
        bcrypt.hash(user.password, 10, function(error, hash) {
            if (error) {
                console.error(`[error] Error para crear el hash: ${error.message}.`);
                return reject("Hubo un problema para crear el usuario.");
            }

            user.password = hash;
            const userNuevo = new Model(user);

            userNuevo.save()
            .then(function(res){
                let userAuth = {
                    username: user.username,
                    password: hash
                };
                const newAuth = new Auth(userAuth);
                newAuth.save()
                .then(function(res) {
                    console.log("[success] Se creó el usuario con éxito.");
                    return resolve(res);
                })
                .catch(function(error){
                    removeUser(user.id);
                    console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                    return reject("Error al guardar los datos del usuario.");
                });
            })
            .catch(function(error) {
                console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                return reject("Error al guardar los datos del usuario.");
            })
        });
    });
}

function editUser(userID, propiedad, valorNuevo) {
    let nuevoUsuario = {};
    nuevoUsuario[propiedad] = valorNuevo;
    return new Promise(function(resolve, reject){
        let nuevaInfo = {};
        nuevaInfo[propiedad] = valorNuevo;
        return Model.updateOne({id: userID}, nuevaInfo, function(error, writeOpResult){
            if (error) {
                console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                return reject("Hubo un problema para actualizar el usuario.");
            }
            console.log(`[success] Se actualizaron los datos con éxito: ${writeOpResult}.`);
            return resolve("Se actualizaron los datos con éxito");
        });
    });
}

function removeUser(userID) {
    return new Promise(function(resolve, reject){
        Model.deleteOne({ id: userID }, function (error) {
            if(error) {
                console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                return reject("Hubo un problema para eliminar el usuario.");
            }
        });
        return resolve("Usuario eliminado con éxito.");
    });
}

module.exports = {
    listUsers,
    getUser,
    addUser,
    editUser,
    removeUser,
};
