const express = require('express');
const user = require('../components/users/network');
const songs = require('../components/songs/network');
const geners = require('../components/geners/network');
const album = require('../components/abums/network');


const routes = function (server) {
    server.use('/user', user)
    server.use('/geners', geners)
    server.use('/song', songs)
    server.use('/album',album)
}

module.exports = routes;