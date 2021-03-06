const Model = require('./model')
const UserModel = require('../users/model');
const GenerModel = require('../geners/model');
const AlbumModel = require('../albums/model');
const SongModel = require('../songs/model');

function addSong(song) {
    const MyGener = new Model(song);
    return MyGener.save(); //returna una promesa
}

function idGenersValidator(idGener) {
    return new Promise((resolve, reject) => {
        GenerModel.find({ _id: idGener }).limit(1).exec((err, idGener) => {
            if (err) {
                return reject('Ocurrio un error al buscar el genero')
            }
            if (idGener.length === 0) {
                return resolve('El genero no existe');
            }
            if (idGener.length !== 0) {
                return resolve(idGener)
            }
        })
    })
}


function idAuthorValidator(idAuthor) {
    return new Promise((resolve, reject) => {
        UserModel.find({ _id: idAuthor }).limit(1).exec((err, idAuthor) => {
            if (err) {
                return reject('Ocurrio un error al buscar el autor')
            }
            if (idAuthor.length === 0) {
                return resolve('El autor no existe');
            }
            if (idAuthor.length !== 0) {
                return resolve(idAuthor)
            }
        })
    })
}


function idAlbumValidator(idAlbum) {
    return new Promise((resolve, reject) => {
        AlbumModel.find({ _id: idAlbum }).limit(1).exec((err, idAlbum) => {
            if (err) {
                return reject('Ocurrio un error al buscar el album')
            }
            if (idAlbum.length === 0) {
                return resolve('El album no existe');
            }
            if (idAlbum.length !== 0) {
                return resolve(idAlbum)
            }
        })
    })
}

function getSongs(){
    return new Promise((resolve, reject) => {
        Model.find().populate('idAuthor').populate('idGener').populate('idAlbum').exec((error, populate) => {
            if (error) {
                reject(error);
                return false;
            }
            resolve(populate)
        })
    })
}

function findAndDelete(idParams, data) {
    return new Promise((resolve, reject) => {
        Model.findOneAndRemove({_id : idParams},(error, song) =>{
            if(error){
                reject('Ocurrio un error al eliminar la cancion')
            }
            if (song === null) {
                reject('No se encuentra la cancion')
            } else {
                resolve(song)
            }

        })
    })

}

function findSong(word) {
    console.log('Estamos en la funcion findSong')
    return new Promise((resolve, reject) => {
        Model.find({nameSong : {$regex: word,  $options: 'i'} }).populate('idAuthor').populate('idGener').populate('idAlbum').exec((error, populate) => {
            if (error) {
                reject(error);
                return false;
            }
            resolve(populate)
        })
    })
}


module.exports = {
    add: addSong,
    idGenersValidator: idGenersValidator,
    idAuthorValidator: idAuthorValidator,
    idAlbumValidator: idAlbumValidator,
    getSongs: getSongs,
    findAndDelete: findAndDelete,
    findSong: findSong
}