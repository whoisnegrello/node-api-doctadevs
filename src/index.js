const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const routes = require("./network/routes");
const dbConnect = require("./db");
const errors = require('./network/errors');

const app = express();
dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.use(errors);

app.listen(config.server.port, () => {
    console.log(`El servidor está corriendo en ${config.server.host}:${config.server.port}`)
});
