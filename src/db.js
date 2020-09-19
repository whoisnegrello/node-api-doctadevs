const mongoose = require('mongoose');

function connect() {
    const dbURL = "mongodb+srv://docta123:docta123@doctadevs.1qznj.mongodb.net/api?retryWrites=true&w=majority";
    mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = connect;
