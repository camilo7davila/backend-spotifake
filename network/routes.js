const express = require('express');
const user = require('../components/users/network');
// const song = require('../components/songs/network');
const album = require('../components/abums/network');


const routes = function (server) {
    server.use('/user', user)
    // server.use('/song', song)
    server.use('/album',album)
}

module.exports = routes;