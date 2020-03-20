const crypto = require('crypto') 
const store = require('./store')

function encript(password){
    let pwd = ''
    crypto.scrypt(password, 'salt', 64, (err, key) => {
        if(err) throw err
        pwd += key.toString('hex')
    })
    return pwd
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