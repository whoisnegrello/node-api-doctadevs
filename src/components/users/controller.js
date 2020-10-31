const store = require('./store');
const { err } = require('../../utils');

function listUsers(){
    return store.listUsers();
}

function getUser(username){
    return store.getUser(username);
}

function addUser(user){
    return store.addUser(user);
}

function editUser(userID, propiedad, valorNuevo){
    return store.editUser(userID, propiedad, valorNuevo);
}

function removeUser(userID){
    return store.removeUser(userID);
}

function listUserPosts(username) {
    return store.listUserPosts(username);
}

module.exports = {
    listUsers,
    getUser,
    addUser,
    editUser,
    removeUser,
    listUserPosts,
};