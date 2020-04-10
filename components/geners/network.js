const express = require('express');
const path = require('path');

const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', (req, res) => {
    controller.addGenerControl(req.body).then(dataGener => {
        response.success(req, res, dataGener, 201)
    }).catch(error => {
        response.error(req, res, error, 500)
    })
});

router.get('/', (req, res) => {
    controller.getGeners().then(dataGener =>{
        response.success(req, res, dataGener, 200)
    }).catch(error => {
        response.error(res, res, error, 500)
    })
})

// router.get('/', (req, res) => {
//     console.log('Estamos en get de geners ***')
// })

module.exports = router;