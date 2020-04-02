const express = require('express');
const path = require('path');
const respone = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    respone.success(req, res,'estamos en get',200 )
    console.log('estamos en get');
})

router.post('/', (req, res) => {
    response.success(req, res, 'estamos en post', 200)
    console.log('estamos en post')
})