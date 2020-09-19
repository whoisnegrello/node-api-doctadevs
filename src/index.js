const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./network/routes');
const dbConnect = require("./db");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnect();
routes(app);

app.listen(3000);
