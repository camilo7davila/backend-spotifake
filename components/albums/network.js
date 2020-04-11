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

router.get('/search_album', (req, res) => {
    var word = req.params.body
    console.log(word);
    var regex = new RegExp("^"+ word, 'i');
    controller.searchAlbum(regex).then(dataSearch => {
        console.log(regex);
        response.success(req,res,dataSearch,200)
    })
})

module.exports = router;