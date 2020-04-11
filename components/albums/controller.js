const store = require('./store');

async function addAlbum(album) {
    if (!album.nameAlbum || !album.dateAlbum || !album.idAutor ) {
        return Promise.reject('Falta un campo')
    }

    // await store.userValidator(user.user).then(() => { }).catch(e => {
    //     return Promise.reject(e)
    // })

    const fullMessage = {
        nameAlbum: album.nameAlbum,
        dateAlbum: album.dateAlbum,
        idAutor: album.idAutor
    }

    return store.add(fullMessage)
}

async function listadoAlbunes(){
    //const getSongs = store.getSongs
    console.log('estamos en listar albunes')
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