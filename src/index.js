const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const routes = require("./network/routes");
const dbConnect = require("./db");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

dbConnect();
routes(app);

app.listen(config.server.port, () => {
    console.log(`El servidor está correindo en ${config.server.host}:${config.server.port}`)
});
