const express = require('express');
const multer = require('multer');
const path = require('path');
const respone = require('../../network/response');
const controller = require('./controller');
const secure = require('./secure')

const router = express.Router();

//Configurando multer, y nombre de como se va a guardar el archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/userFiles/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
})

const upload = multer({ storage: storage })

//funcion de prueba 
router.get('/', (req, res) => {
    respone.success(req, res,'estamos en get',200 )
    console.log('estamos en get');
})

//creacion de un usuario, opcional se puede subir foto
router.post('/',(req, res) => {
    controller.addUser(req.body).then(data => {
        console.log(data)
        respone.success(req,res, data, 201)
    }).catch(e => {
        respone.error(req, res, String(e), 500)
    })
})

//Hacer login del usuario, devuleve token
router.post('/login', (req,res) => {
    controller.loginUser(req.body).then(token => {
        console.log(token);
        respone.success(req,res,token,201)
    }).catch(e => {
        respone.error(req,res, e , 400)
    })
})

//funcion para agregar a favoritos
router.patch('/addFavorite/:id',secure('update'), (req, res) => {
    controller.addFavSong(req.params.id,req.body).then(data => {
        respone.success(req,res, data, 200)
    }).catch(e => {
        respone.error(req,res,e, 500)
    })
})

//funcion para eliminar favoritos
router.patch('/removeFavorite/:id',secure('update'), (req,res) => {
    controller.deleteFavSong(req.params.id,req.body).then(data=> {
        respone.success(req,res,data,200)
    }).catch(e => {
        respone.error(req,res,e,500)
    })
})


//Editar el usuario, devuelve la info editada
router.patch('/:id',secure('update'),(req,res) => {
    controller.editUser(req.params.id,req.body).then(data => {
        respone.success(req,res,data, 200)
    }).catch(e => {
        console.error('Error => ',e);
        respone.error(req,res,e, 400)
    })
})

//Obtener Usuario por Id

router. get('/:id', (req,res) => {
    controller.userById(req.params.id).then(data => {
        respone.success(req,res,data, 200)
    }).catch(e => {
        respone.error(req,res,e,501)
    })
})

//router de prueba

module.exports = router;