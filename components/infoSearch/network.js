const express = require('express');
const respone = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    controller.search(req.query.type, req.query.id).then(data => {
        respone.success(req, res, data, 200)
    }).catch(e => {
        respone.error(req, res, e, 500)
    })
})

module.exports = router
