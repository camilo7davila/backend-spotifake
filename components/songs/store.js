const Model = require('./model')
const UserModel = require('../users/model');
const GenerModel = require('../geners/model')

function addSong(song){
    const MyGener = new Model(song);
    console.log('Creando cancion');
    return MyGener.save();
}

function idGenersValidator(idGener){
    return new Promise((resolve, reject) => {
        GenerModel.find({ _id: idGener }).limit(1).exec((err, idGener) => {
            if (err){
                return reject('Ocurrio un error al buscar el genero')
            }
            if (idGener.length === 0){
                return resolve('El genero no existe');
            }
            if (idGener.length !== 0){
                return resolve(idGener)
            }
        })
    })
}


function idAuthorValidator(idAuthor){
    return new Promise((resolve, reject) => {
        UserModel.find({ _id: idAuthor }).limit(1).exec((err, idAuthor) => {
            if (err){
                return reject('Ocurrio un error')
            }
            if (idAuthor.length === 0){
                return resolve('El autor no existe');
            }
            if (idAuthor.length !== 0){
                return resolve(idAuthor)
            }
        })
    })
}


function idAlbumValidator(idAlbum){
    return new Promise((resolve, reject) => {
        Model.find({ idAlbum: idAlbum }).limit(1).exec((err, idAlbum) => {
            if (err){
                return reject('Ocurrio un error')
            }
            if (idAlbum.length === 0){
                return resolve('El autor no existe');
            }
            if (idAlbum.length !== 0){
                return resolve(idAlbum)
            }
        })
    })
}

function getSongs(){
    console.log('entrando a la funcion getsongs BD ')
    return new Promise((resolve, reject) => {
        Model.find().populate('user').exec((error, populate) => {
            if(error){
                reject(error);
                return false;
            }
            console.log('populate -----------------> ',populate)
            resolve(populate)
        })
    })
}

module.exports = {
    add: addSong,
    idGenersValidator: idGenersValidator,
    idAuthorValidator: idAuthorValidator,
    idAlbumValidator: idAlbumValidator,
    getSongs: getSongs
}