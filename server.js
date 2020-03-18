const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const db = require('./db')

db('mongodb+srv://root_bm:root_bm@bictiamusic-7kfl1.mongodb.net/test?retryWrites=true&w=majority')

let app = express();

app.use(bodyParser.json())

router(app)

app.use('/app', express.static('public'));

app.listen(3000);
console.log('la app escucha desde el puerto 3000');