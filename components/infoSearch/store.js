const songModel = require('../songs/model');
const UserModel = require('../users/model');
const GenerModel = require('../geners/model');
const AlbumModel = require('../albums/model');

function searchAlbum(id){
    return new Promise((resolve,reject)=> {
        songModel.find({idAlbum: id}).populate('idAlbum').populate('idAuthor').populate('idGener').exec((err, songs) => {
            if(err){
                return reject('ocurrio un error')
            }
            if(songs.length === 0){
                return reject('no se encontro archivos en la busqueda')
            }
            return resolve(songs)
        })
    })
}

function searchGener(id){
    return new Promise((resolve,reject)=> {
        songModel.find({idGener: id}).populate('idAlbum').populate('idAuthor').populate('idGener').exec((err, songs) => {
            if(err){
                return reject('ocurrio un error')
            }
            if(songs.length === 0){
                return reject('no se encontro archivos en la busqueda')
            }
            return resolve(songs)
        })
    })
}

function searchAuthor(id){
    return new Promise((resolve,reject)=> {
        songModel.find({idAuthor: id}).populate('idAlbum').populate('idAuthor').populate('idGener').exec((err, songs) => {
            if(err){
                return reject('ocurrio un error')
            }
            if(songs.length === 0){
                return reject('no se encontro archivos en la busqueda')
            }
            return resolve(songs)
        })
    })
}

module.exports = {
    searchAlbum,
    searchGener,
    searchAuthor
}