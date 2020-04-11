const express = require('express');
const path = require('path');

const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', (req, res) => {
    controller.addAlbumController(req.body).then(data => {
        response.success(req, res, data, 201)
    }).catch(error => {
        response.error(req, res, error, 500)
    })
});

router.get('/', (req, res) =>{
    controller.listadoAlbunes().then(dataAlbum => {
        response.success(req, res, dataAlbum, 200)
    }).catch(error => {
        response.error(req, res, error, 500)
    })
});

router.get('/listbyauthor/:id', (req,res) => {
    controller.listarAlbunesById(req.params.id).then(info => {
        response.success(req,res,info,200)
    }).catch(e => {
        response.error(req,res,e,501)
    })
})

module.exports = router;