const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let publicaciones = [];

app.get('/', function (req, res) {
    res.send('Hola Mundo en el Home!');
});

app.get('/publicaciones/:id', function (req, res) {
    res.send(`Hola Mundo en Publicación! El id es ${req.params.id}`);
});

app.get('/publicaciones', function (req, res) {
    res.json(publicaciones);
});

app.post('/publicacion', function (req, res) {
    console.log(req.headers);
    console.log(req.query);
    publicaciones.push(req.body);
    res.json(publicaciones);
});

app.put('/publicacion/:id', function (req, res) {
    res.send('Hola Mundo en Publicación!');
});

app.patch('/publicacion/:id', function (req, res) {
    res.send('Hola Mundo en Publicación!');
});

app.delete('/publicacion/:id', function (req, res) {
    res.send('Hola Mundo en Publicación!');
});

app.listen(9000);