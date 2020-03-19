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

function addUser(user, file){
    if(!user.firstName || !user.lastName || !user.user || !user.email || !user.password){
        return Promise.reject('faltan datos perrito')
    }
    // let fileUrl = '';
    // if(file){
    //     fileUrl = 'http://localhost:3000/app/userFiles/'+file.filename
    // }
    
    user.password = encript(user.password)

    console.log('adding obj')

    const fullMessage = {
        ...user,
        creation: new Date(),
        photo: file
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