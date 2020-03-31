const express = require('express');
const user = require('../components/users/network');
// const song = require('../components/songs/network');
const geners = require('../components/geners/network');


const routes = function (server) {
    server.use('/user', user)
    server.use('/geners', geners)
    // server.use('/song', song)
}

module.exports = routes;