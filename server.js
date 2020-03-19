'use strict'
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const db = require('./db')

db('mongodb+srv://root_bm:root_bm@bictiamusic-7kfl1.mongodb.net/test?retryWrites=true&w=majority')

let app = express();

app.use(bodyParser.json())

router(app)

app.use(cors());

app.use('/app', express.static('public'));

app.set('port',process.env.PORT || 3000)

app.listen(app.get('port')), () => {
    console.log(`la app esta escuchando en ${app.get('port')}`);
}