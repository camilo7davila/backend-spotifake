const store = require('./store');

async function addSong(song, audio){
    if (!song.nameSong || !song.idGener || !song.idAuthor ){
        return Promise.reject('Faltan datos de la cancion')
    }

    // await store.idGenersValidator(song.idGener)
    
    await store.idAuthorValidator(song.idAuthor)

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

module.exports = {
    addSong: addSong
}

// ,
//         audio: audio
//!song.durationSong ||
//|| !song.idAlbum