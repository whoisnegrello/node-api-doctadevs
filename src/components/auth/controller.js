const store = require("./store");

function login(username, pass) {
    return new Promise((resolve, reject) =>{
        resolve(store.login(username, pass));
    });
}

module.exports = {
    login,
};