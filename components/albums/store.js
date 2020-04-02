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


module.exports = {
    add: addAlbum,
    getAlbums: getAlbums
} 