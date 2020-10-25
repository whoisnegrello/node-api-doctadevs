const store = require("./store");

function login(username, pass) {
    return store.login(username, pass);
}

module.exports = {
    login,
};