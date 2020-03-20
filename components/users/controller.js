const crypto = require('crypto') 
const store = require('./store')

function encript(password){
    let algorithm = 'aes-256-cbc'; //algoritmo de encriptación;
    let key = crypto.createCipher(algorithm, password)
    let encriptedPass = key.update(password, 'utf8', 'hex')
    encriptedPass += key.final('hex')

    return encriptedPass;
}

async function addUser(user, file){
    if(!user.firstName || !user.lastName || !user.user || !user.email || !user.password){
        return Promise.reject('falta algun campo')
    }

    await store.emailValidator(user.email).then(() => {}).catch(e => {
        return Promise.reject(e)
    })

    await store.userValidator(user.user).then(() => {}).catch(e => {
        return Promise.reject(e)
    })
    
    user.password = encript(user.password)
    
    const fullMessage = {
        ...user,
        creation: new Date(),
        photo: file
    }
    return store.add(fullMessage)
}

module.exports = {
    addUser
}