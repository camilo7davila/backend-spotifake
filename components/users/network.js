const express = require('express');
const multer = require('multer');
const path = require('path');
const respone = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

// const upload = multer({
//     dest: 'public/files/',
// })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/userFiles/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
    respone.success(req, res,'estamos en get',200 )
    console.log('estamos en get');
})

router.post('/', upload.single('photo') ,(req, res) => {
    console.log(req.file)
    controller.addUser(req.body,req.file).then(data => {
        respone.success(req,res, data, 201)
    }).catch(e => {
        respone.error(req, res, 'algo ocurrio en post', 500)
        console.log('este es el error => ',e);
    })
})

module.exports = router;