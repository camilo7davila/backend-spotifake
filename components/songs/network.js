const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");

const secure = require("./secure");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/songs");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
//upload songs
const upload = multer({ storage: storage });
let dobleInput = upload.fields([{ name: "songs" }, { name: "photo" }]);
router.post("/", dobleInput, (req, res) => {
  let fileUrl = "";
  if (req.file) {
    fileUrl = `${req.protocol}://${req.get("host")}/app/fileSongs/${
      req.file.filename
    }`;
  } 
  controller
    .addSong(req.body, fileUrl)
    .then((data) => {
      console.log(data);
      respone.success(req, res, data, 201);
    })
    .catch((e) => {
      respone.error(req, res, String(e), 500);
    });
 
});



//
router.post("/", secure("postCreate"), (req, res) => {
  console.log(req.body);
  controller
    .addSong(req.body)
    .then((dataSong) => {
      response.success(req, res, dataSong, 201);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.get("/", (req, res) => {
  console.log("GET");
  controller
    .listarCanciones()
    .then((dataSong) => {
      response.success(req, res, dataSong, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

module.exports = router;
