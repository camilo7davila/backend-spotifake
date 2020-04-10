const Model = require('./model')

function addAlbum(album) {
    const album1 = new Model(album);
    console.log('Modelo album');
    return album1.save(); 
}

function getAlbums(){
    console.log('entrando a la funcion getsongs BD ')
    return new Promise((resolve, reject) => {
        Model.find().populate('idAuthor').exec((error, populate) => {
            if(error){
                reject(error);
                return false;
            }
            console.log('populate -----------------> ',populate)
            resolve(populate)
        })
    })
}

function getAlbumsById(id){
    return new Promise((resolve,reject) => {
        Model.find({idAutor : id}).exec((err,data) => {
            if(err){
                return reject(e)
            }
            if(data.length === 0){
                return resolve('No se encontro albumes')
            }
            return resolve(data)
        })
    })
}


module.exports = {
    add: addAlbum,
    getAlbums: getAlbums,
    getAlbumsById: getAlbumsById
} 