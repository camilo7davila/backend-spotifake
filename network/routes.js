const express = require('express');
const user = require('../components/users/network');
const songs = require('../components/songs/network');
const geners = require('../components/geners/network');
const album = require('../components/albums/network');
const search =require('../components/infoSearch/network')


const routes = function (server) {
    server.use('/user', user)
    server.use('/geners', geners)
    server.use('/song', songs)
    server.use('/album',album)
    server.use('/search', search)
}

module.exports = routes;