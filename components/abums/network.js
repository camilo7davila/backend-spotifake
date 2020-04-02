const express = require('express');
const path = require('path');

const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', (req, res) => {
    console.log(req.body)
    controller.addAlbumController(req.body).then(data => {
        response.success(req, res, data, 201)
    }).catch(error => {
        response.error(req, res, error, 500)
    })
});


module.exports = router;