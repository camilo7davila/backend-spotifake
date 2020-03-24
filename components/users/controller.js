const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const store = require('./store')

function signData(data) {
    return jwt.sign(data, 'secreto')
}

async function addUser(user, file) {
    if (!user.firstName || !user.lastName || !user.user || !user.email || !user.password) {
        return Promise.reject('falta algun campo')
    }

    await store.emailValidator(user.email).then(() => { }).catch(e => {
        return Promise.reject(e)
    })

    await store.userValidator(user.user).then(() => { }).catch(e => {
        return Promise.reject(e)
    })

    const fullMessage = {
        firstName: user.firstName,
        lastName: user.lastName,
        user: user.user,
        email: user.email,
        password: await bcrypt.hash(user.password, 5),
        photo: file
    }
    return store.add(fullMessage)
}

async function loginUser(data) {
    if (!data.email || !data.password) {
        return Promise.reject('Falta algun campo')
    };

    let user = await store.loginValidation(data)
    const auth = {
        email: user[0].email,
        user: user[0].user,
    }
    return bcrypt.compare(data.password, user[0].password).then(sonIguales => {
        if (sonIguales === true) {
            return signData(auth)
        } else {
            return Promise.reject('La constraseña no coincide')
        }
    })
}

module.exports = {
    addUser,
    loginUser
}