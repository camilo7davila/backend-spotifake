const store = require('./store');
const mongoose = require('mongoose')

// async function searchAlbum(id){
//     console.log(id);
//     if(!id){
//         return Promise.reject('no viene id')
//     }
//     if(mongoose.Types.ObjectId.isValid(id) !== true){
//         return Promise.reject('este no es un id de mongo')
//     }
//     let search = store.sA(id)
//     return (search)
// }

async function search(type, id) {
    if (!id || !type) {
        return Promise.reject('faltan parametros')
    }
    if (mongoose.Types.ObjectId.isValid(id) !== true) {
        return Promise.reject('este no es un id de mongo')
    }

    if(type > 4){
        return Promise.reject('este es un tipo de busqueda valido, validar parametros')
    }

    let search = null

    switch(type){
        case '1' :
            search = store.searchAlbum(id)
        break
        case '2': 
            search = store.searchGener(id)
        break
        case '3':
            search = store.searchAuthor(id)
        break
    }
    return (search)
}

module.exports = {
    search
}