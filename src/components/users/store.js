const Model = require("./model");

function listUsers() {
    return Model.find({});
}

function getUser(userID) {
    return Model.find({ id: userID });
}

function addUser(user) {
    const userNuevo = new Model(user);
    return userNuevo.save();
}


function editUser(userID, propiedad, valorNuevo) {
    let nuevoUsuario = {};
    nuevoUsuario[propiedad] = valorNuevo;
    return Model.updateOne(
        {
            id: userID
        },
        nuevoUsuario
    );
}

function removeUser(userID) {
    return Model.deleteOne({ id: userID });
}

module.exports = {
    listUsers,
    getUser,
    addUser,
    editUser,
    removeUser,
};