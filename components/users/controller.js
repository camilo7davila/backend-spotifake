const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const store = require('./store')
const authExport = require('../../auth/index')

async function addUser(user, file) {
    if (!user.firstName || !user.lastName || !user.user || !user.email || !user.password) {
        return Promise.reject('falta algun campo')
    }

    await store.emailValidator(user.email)

    await store.userValidator(user.user)

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
        id: user[0]._id,
        email: user[0].email,
        user: user[0].user,
    }

    const userFinal = {
        ...auth,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        photo: user[0].photo,
        token: authExport.sign(auth)
    }
    return bcrypt.compare(data.password, user[0].password).then(sonIguales => {
        if (sonIguales === true) {
            return userFinal
        } else {
            return Promise.reject('La constraseña no coincide')
        }
    })
}

async function editUser(id, data) {
        if (!data || !id) {
            return Promise.reject('faltan parametros')
        }
        if(mongoose.Types.ObjectId.isValid(id) !== true){
            return Promise.reject('el id no es correcto')
        }
        let edit = await store.findAndUpdate(id, data);
        if(edit === null){
            return Promise.reject('No se encontro usuario')
        }
        return edit
}

async function addFavSong(id, body) {
    if (!id || !body.favSong){
        return Promise.reject('falta información')
    }
    if (mongoose.Types.ObjectId.isValid(id) !== true || mongoose.Types.ObjectId.isValid(body.favSong) !== true) {
        return Promise.reject('Algun id no es valido')
    }

    let validator = await store.validarFavSong(id,body)

    let edit = await store.addFav(id, body)
    return edit
}

async function deleteFavSong(id, body){
    if (!id || !body.favSong){
        return Promise.reject('falta información')
    }
    if (mongoose.Types.ObjectId.isValid(id) !== true || mongoose.Types.ObjectId.isValid(body.favSong) !== true) {
        return Promise.reject('Algun id no es valido')
    }

    let edit = await store.removeFav(id, body)
    return edit
}

module.exports = {
    addUser,
    loginUser,
    editUser,
    addFavSong,
    deleteFavSong
}