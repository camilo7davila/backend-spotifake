const express = require('express');
const multer = require('multer');
const path = require('path');
const response = require('../../network/response');
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



//creacion de un usuario, opcional se puede subir foto
router.post('/',(req, res) => {
    controller.addUser(req.body).then(data => {
        console.log(data)
        response.success(req,res, data, 201)
    }).catch(e => {
        response.error(req, res, String(e), 500)
    })
})

//Hacer login del usuario, devuleve token
router.post('/login', (req,res) => {
    controller.loginUser(req.body).then(token => {
        console.log(token);
        response.success(req,res,token,201)
    }).catch(e => {
        response.error(req,res, e , 400)
    })
})

//funcion para agregar a favoritos
router.patch('/addFavorite/:id',secure('update'), (req, res) => {
    controller.addFavSong(req.params.id,req.body).then(data => {
        response.success(req,res, data, 200)
    }).catch(e => {
        response.error(req,res,e, 500)
    })
})

//funcion para eliminar favoritos
router.patch('/removeFavorite/:id',secure('update'), (req,res) => {
    controller.deleteFavSong(req.params.id,req.body).then(data=> {
        response.success(req,res,data,200)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})


//Editar el usuario, devuelve la info editada
router.patch('/edituser/:id',secure('update'),(req,res) => {
    controller.editUser(req.params.id,req.body).then(data => {
        response.success(req,res,data, 200)
    }).catch(e => {
        console.error('Error => ',e);
        response.error(req,res,e, 400)
    })
})

//Obtener Usuario por Id

router. get('/userbyid/:id', (req,res) => {
    controller.userById(req.params.id).then(data => {
        response.success(req,res,data, 200)
    }).catch(e => {
        response.error(req,res,e,501)
    })
})

//Obtener todos los usuarios que son artistas
router.get('/artist', (req, res) => {
    controller.getArtist().then(artistas => {
        response.success(req, res,artistas,200 )
    }).catch(e => {
        response.error(req,res,e,501)
    })
})


//Obtener todos los usuarios que son artistas
router.get('/', (req, res) => {
    response.success(req, res,'estamos en get',200 )
    console.log('estamos en get');
})




router.post('/searchrg', (req, res) => {
    var word = req.body.word
    console.log(word);
    controller.searchAutor(word).then(dataSearch => {
        console.log(word);
        response.success(req,res,dataSearch,200)
    }).catch(e => {
        console.error('Error => ', e);
        response.error(req, res, e, 400)
    })
})

module.exports = router;