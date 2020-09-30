const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const routes = require("./network/routes");
const dbConnect = require("./db");

const app = express();
dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.listen(config.server.port, () => {
    console.log(`El servidor está correindo en ${config.server.host}:${config.server.port}`)
});
