const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    server: {
        host: process.env.HOST || "http://localhost",
        port: process.env.PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secreto',
    },
}
