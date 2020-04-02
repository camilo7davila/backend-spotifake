const store = require('./store');

async function addSong(song){
    if (!song.nameSong || !song.idGener || !song.idAuthor ){
        return Promise.reject('Faltan datos de la cancion')
    }

    await store.idGenersValidator(song.idGener);
    await store.idAuthorValidator(song.idAuthor);
    
    // await store.idAuthorValidator(song.idAuthor).then(() => { }).catch(e => {
    //     return Promise.reject('id del autor invalido')
    // })//dos formas de llamar la funcion

    // await store.idAlbumValidator(song.idAlbum)

    const fullMessage = {
        nameSong: song.nameSong,
        durationSong: song.durationSong,
        idGener: song.idGener,
        idAuthor: song.idAuthor,
        idAlbum: song.idAlbum
    }

    return store.add(fullMessage)
}

function listarCanciones(){
    
    return new Promise((resolve, reject) => {
        //const getSongs = store.getSongs
        console.log('estamos en listar canciones')
        resolve(store.getSongs());
    })
}

module.exports = {
    addSong: addSong,
    listarCanciones: listarCanciones
}

// ,
//         audio: audio
//!song.durationSong ||
//|| !song.idAlbum