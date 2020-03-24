const express = require('express');
const multer = require('multer');
const path = require('path');
const respone = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

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
    let fileUrl = ''
    if(req.file){
        fileUrl = `${req.protocol}://${req.get('host')}/app/userFiles/${req.file.filename}`
    }else{
        fileUrl = `${req.protocol}://${req.get('host')}/app/userAvatar/genericAvatar.png`
    }
    controller.addUser(req.body, fileUrl).then(data => {
        respone.success(req,res, data, 201)
    }).catch(e => {
        respone.error(req, res, String(e), 500)
    })
})

router.post('/login', (req,res) => {
    controller.loginUser(req.body).then(token => {
        console.log(token);
        respone.success(req,res,token,201)
    }).catch(e => {
        console.log(e);
        respone.error(req,res, e , 400)
    })
})

module.exports = router;