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


module.exports = {
    addGenerControl: addGener,
    getGeners: getGeners
}