const bcrypt = require("bcrypt");
const { Promise } = require("mongoose");
const auth = require("../../secure");
const Model = require("./model");

function login(username, pass) {
    return new Promise(function(resolve, reject){
        if (!username || !pass) {
            console.error("[error] Faltan datos para hacer la autenticación.");
            return reject("Faltan datos");
        };

        Model
        .findOne({username : username})
        .exec(function(error, res){
            if (error){
                console.error(`[error] Error para acceder a la DB: ${error.message}.`);
                return reject("Los datos de acceso no son válidos.");
            }

            if (res === null){
                console.error("[error] La DB no arrojó ningún resultado.");
                return reject("Los datos de acceso no son válidos.");
            }
            bcrypt.compare(pass, res.password, function(error, result) {
                if (error) {
                    console.error(`[error] La verificación arrojó un error: ${error.message}.`);
                    return reject(error);
                }

                if (!result) {
                    console.error("[error] El password no pasó la verificación.");
                    return reject("Los datos de acceso no son válidos.");
                }

                const token = auth.sign({ sub: res.id });
                return resolve({token});
            });
        });
    });
}

module.exports = {
    login,
};
