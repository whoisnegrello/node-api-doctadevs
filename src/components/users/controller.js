const store = require('./store');

function listUsers(){
    return new Promise((resolve, reject) =>{
        resolve(store.listUsers());
    });
}

function getUser(userID){
    return new Promise((resolve, reject) =>{
        if(!userID){
            reject('No ingresantes ningún ID de usuario.');
        }
        resolve(store.getUser(userID));
    });
}

function addUser(user){
    return new Promise((resolve, reject) =>{
        if(!user){
            reject('No ingresantes ningún usuario.');
        }
        resolve(store.addUser(user));
    });
}

function editUser(userID, propiedad, valorNuevo){
    return new Promise((resolve, reject) =>{
        if(!userID || !propiedad || !valorNuevo){
            reject('No ingresaste algún elemento requerido.');
        }
        resolve(store.editUser(userID, propiedad, valorNuevo));
    });
}

function removeUser(userID){
    return new Promise((resolve, reject) =>{
        if(!userID){
            reject('No ingresantes ningún usuario.');
        }
        resolve(store.removeUser(userID));
    });
}

module.exports = {
    listUsers,
    getUser,
    addUser,
    editUser,
    removeUser,
};