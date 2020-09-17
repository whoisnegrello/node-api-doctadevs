const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router(app);

app.listen(3000);
