const store = require('./store');

async function addSong(song, fileUrl, fileImgSongUrl){
    if (!song.nameSong || !song.idGener || !song.idAuthor || !song.qualification){
        return Promise.reject('Faltan datos de la cancion')
    }

    await store.idGenersValidator(song.idGener);
    await store.idAuthorValidator(song.idAuthor);
    await store.idAlbumValidator(song.idAlbum);
    
    // await store.idAuthorValidator(song.idAuthor).then(() => { }).catch(e => {
    //     return Promise.reject('id del autor invalido')
    // })//dos formas de llamar la funcion

    const fullMessage = {
        nameSong: song.nameSong, 
        idGener: song.idGener,
        idAuthor: song.idAuthor,
        idAlbum: song.idAlbum,
        qualification: song.qualification,
        songFile: fileUrl,
        imgSong: fileImgSongUrl
    }

    return store.add(fullMessage)
}

async function listarCanciones(){
    //const getSongs = store.getSongs
    console.log('estamos en listar canciones')
    return store.getSongs();
}

async function deleteSong(idSong, idAuthor){
    if(!idAuthor || !idSong){
        return Promise.reject('Faltan parametros')
    }
    const deleteSong = await store.findAndDelete(idSong);
    
    return deleteSong
    
}

module.exports = {
    addSong: addSong,
    listarCanciones: listarCanciones,
    deleteSong: deleteSong
}
