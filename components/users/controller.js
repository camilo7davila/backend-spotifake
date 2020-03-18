const crypto = require('crypto') 
const store = require('./store')

function encript(password){
    let algorithm = 'aes-256-cbc'; //algoritmo de encriptación;
    let key = crypto.createCipher(algorithm, password)
    let encriptedPass = key.update(password, 'utf8', 'hex')
    encriptedPass += key.final('hex')

    return encriptedPass;
}

function addUser(user, file){
    if(!user.firstName || !user.lastName || !user.user || !user.email || !user.password){
        return Promise.reject('missing parameters')
    }
    let fileUrl = '';
    if(file){
        fileUrl = 'http://localhost:3000/app/userFiles/'+file.filename
    }
    
    user.password = encript(user.password)

    const fullMessage = {
        ...user,
        creation: new Date(),
        photo: fileUrl
    }
    // const fullMessage = {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     user: user.user,
    //     email: user.email,
    //     passwprd: user.password,
    //     photo: fileUrl
    // }
    
    return store.add(fullMessage)
}

module.exports = {
    addUser
}