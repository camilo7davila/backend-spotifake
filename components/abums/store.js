const Model = require('./model')

function addAlbum(album) {
    const album1 = new Model(album);
    console.log('Modelo album');
    return album1.save(); 
}



module.exports = {
    add: addAlbum
} 