const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');

let app = express();

app.use(bodyParser.json())