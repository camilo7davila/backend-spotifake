const store = require('./store');

async function addGener(gener) {
    if (!gener.nameGener) {
        return Promise.reject('falta algun campo del genero')
    }

    // await store.userValidator(user.user).then(() => { }).catch(e => {
    //     return Promise.reject(e)
    // })

    const fullMessage = {
        nameGener: gener.nameGener
    }
    
    return store.add(fullMessage)
}

async function getGeners(){
    return store.findGener();
}

async function searchGeners(word){
    if(!word){
        return Promise.reject('Faltan datos de busqueda')
    }else{
        console.log('estamos buscando genero')
        return store.findByGener(word)
    }
    
}

module.exports = {
    addGenerControl: addGener,
    getGeners: getGeners,
    searchGeners : searchGeners
}