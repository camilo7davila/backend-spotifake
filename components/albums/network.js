const express = require('express');
const path = require('path');

const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/albums");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage });

  let dobleInput = upload.fields([{ name: "albums" }, { name: "photo" }]);
  router.post("/", dobleInput, (req, res) => {
    
   
  });


  
//////
router.post('/', (req, res) => {
    console.log(req.body)
    controller.addAlbumController(req.body).then(data => {
        response.success(req, res, data, 201)
    }).catch(error => {
        response.error(req, res, error, 500)
    })
});

router.get('/', (req, res) =>{
    console.log('GET');
    controller.listadoAlbunes().then(dataAlbum => {
        response.success(req, res, dataAlbum, 200)
    }).catch(error => {
        response.error(req, res, error, 500)
    })
});

module.exports = router;