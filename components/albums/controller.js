const store = require('./store');

async function addAlbum(album) {
    if (!album.nameAlbum || !album.dateAlbum || !album.idAutor || !album.photo) {
        return Promise.reject('Falta un campo')
    }

    const fullMessage = {
        nameAlbum: album.nameAlbum,
        dateAlbum: album.dateAlbum,
        idAutor: album.idAutor,
        photo: album.photo
    }

    return store.add(fullMessage)
}

async function listadoAlbunes(){
    //const getSongs = store.getSongs
    return store.getAlbums();
}

async function searchAlbum(word){
    console.log('estamos buscando el album')
    return store.findAlbum(word)
}

module.exports = {
    addAlbumController: addAlbum,
    listadoAlbunes: listadoAlbunes,
    searchAlbum : searchAlbum
    
} 