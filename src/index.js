const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./network/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

app.listen(3000);
