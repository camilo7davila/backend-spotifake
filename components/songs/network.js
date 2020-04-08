const express = require('express');

const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

const secure = require('./secure')

router.post('/',secure('postCreate'), foto, mp3 ,(req, res) => {
    console.log(req.body)
    controller.addSong(req.body).then(dataSong => {
        response.success(req, res, dataSong, 201)
    }).catch(error => {
        response.error(req, res, error, 500)
    })
});

router.get('/', (req, res) => {
    console.log('GET');
    controller.listarCanciones().then(dataSong => {
        response.success(req, res, dataSong, 200)
    }).catch(error => {
        response.error(req, res, error, 500)
    })
})

module.exports = router;