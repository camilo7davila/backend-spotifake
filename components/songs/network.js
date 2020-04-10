const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const secure = require('./secure');
const path = require('path');
const multer = require('multer');

//Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/songFiles/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
})
const upload = multer({ storage: storage })


router.post('/', secure('postCreate'), (req, res) => {

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

router.delete('/:id', secure('postDelete'), (req, res) => {
    controller.deleteSong(req.params.id, req.body.idAuthor).then(data => {
        response.success(req, res, 'se elimino la cancion exitosamente', 200)
    }).catch(e => {
        console.error('Error => ', e);
        response.error(req, res, e, 400)
    })
})

module.exports = router;