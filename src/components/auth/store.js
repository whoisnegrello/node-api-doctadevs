const bcrypt = require("bcrypt");
const { Promise } = require("mongoose");
const auth = require("../../secure");
const Model = require("./model");
const { err } = require('../../utils');

async function login(username, pass) {
    try {
        const user = await Model.findOne({username : username});
        if (user === null){
            throw err("[login error]", "Los datos de acceso no son válidos", 403);
        }

        const checkPass = await bcrypt.compare(pass, user.password)
        if (!checkPass) {
            throw err("[login error]", "Los datos de acceso no son válidos", 403);
        }

        const token = await auth.sign({ user: user.username, role: user.role });
        if (!token) {
            throw err("[login error]", "Los datos de acceso no son válidos", 403);
        }

        return { token };
    } catch (error) {
        throw err("[login error]", error.message, error.statusCode);
    }
}

module.exports = {
    login,
};
