const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const secure = require('./secure');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/songFiles/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
})
const upload = multer({ storage: storage })


router.post('/', upload.fields([{name: 'songFile', maxCount: 1}, {name: 'imgSong', maxCount: 1}]),secure('postCreate'),(req, res) => {
    console.log('************',req.files['songFile'][0])
    console.log('////////////->',req.files['imgSong'][0])
    let fileMp3Url = ''
    let fileImgSongUrl = ''
    if(req.files['songFile'][0]){
        fileMp3Url = `${req.protocol}://${req.get('host')}/app/songFiles/${req.files['songFile'][0].filename}`
    }
    if(req.files['imgSong'][0]){
        fileImgSongUrl = `${req.protocol}://${req.get('host')}/app/songFiles/${req.files['imgSong'][0].filename}`
    }
    controller.addSong(req.body, fileMp3Url, fileImgSongUrl).then(dataSong => {
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

router.delete('/:id',secure('postDelete'),(req, res) => {
    controller.deleteSong(req.params.id,req.body.idAuthor).then(data => {
        response.success(req,res, 'se elimino la cancion exitosamente', 200)
    }).catch(e => {
        console.error('Error => ',e);
        response.error(req,res,e, 400)
    })
})

module.exports = router;