const Model = require('./model')

function addUser(user) {
    const myUser = new Model(user);
    return myUser.save(); // save ya devuelve una promesa
}

function emailValidator(email) {
    return new Promise((resolve, reject) => {
        Model.find({ email: email }).limit(1).exec((err, email) => {
            if (err) {
                reject('Ocurrio un error')
            }
            if (email.length === 0) {
                resolve('Correo permitido');
            } else {
                reject('Ya existe el correo')
            }
        })
    })
}

function userValidator(user) {
    return new Promise((resolve, reject) => {
        Model.find({ user: user }).limit(1).exec((err, user) => {
            if (err) {
                reject('Ocurrio un error')
            }
            if (user.length === 0) {
                resolve('Usario permitido');
            } else {
                reject('Ya existe el usuario')
            }
        })
    })
}

function loginValidation(dataEmail) {
    return new Promise((resolve, reject) => {
        Model.find({ email: dataEmail.email }).limit(1)
            .exec((err, user) => {
                if (err) {
                    reject('Ocurrio un error en la busqueda')
                }
                if (user.length === 0) {
                    reject('No se encontro usuario')
                }
                if (user.length !== 0) {
                    resolve(user)
                }
            })
    })
}

function findAndUpdate(idParams, data) {
    return new Promise((resolve, reject) => {
        Model.findOneAndUpdate({ _id: idParams }, data, { new: true }, (error, user) => {
            if (error) {
                return reject('Ocurrio un error en la busqueda del usuario')
            }
            return (user)
        })
    })
}

function removeFav(id, body) {
    return new Promise((resolve,reject) => {
        Model.findOneAndUpdate({ _id: id }, { $pull: { favSong: body.favSong } },{ new: true }).exec((err, data ) => {
            if (err) {
                return reject('Ocurrio un error')
            }
            return resolve(data)
        })
    })
}

function addFav(id, body) {
    return new Promise((resolve,reject) => {
        Model.findOneAndUpdate({ _id: id }, { $push: { favSong: body.favSong } },{ new: true }).exec((err, data ) => {
            if (err) {
                return reject('Ocurrio un error')
            }
            return resolve(data)
        })
    })
}

function validarFavSong(id, body) {
    return new Promise((resolve, reject) => {

        Model.findOne({ _id: id }).exec((error, data) => {
            if (error) {
                return reject('error al buscar en favoritos')
            }

            if(data.favSong){
                data.favSong.forEach(element => {
                    if (element == body.favSong) {
                        return reject('esta cancion ya esta agregada en favoritos')
                    }
                });
                return resolve(true)
            }else{
                return resolve(true)
            }
        })
    })
}

function userById(id){
    return new Promise((resolve,reject) => {
        Model.find({_id: id}).exec((err, user)=> {
            if(err){
                return reject('Ocurrio un error en la busqqueda del usuario')
            }
            if(user.length === 0){
                return reject('No se encontraron coincidencias con el id')
            }
            return resolve(user)
        })
    })
}

function getArtist(){
    return new Promise((resolve, reject) => {
        Model.find({rol: true}).exec((err, users) => {
            if(err){
                return reject('Ocurrio un error en la busqueda de los artistas')
            }
            if(users.length === 0){
                return reject('No se encontraron artistas')
            }
            return resolve(users)
        })
    })
}

module.exports = {
    add: addUser,
    emailValidator: emailValidator,
    userValidator: userValidator,
    loginValidation: loginValidation,
    findAndUpdate: findAndUpdate,
    addFav: addFav,
    validarFavSong: validarFavSong,
    removeFav: removeFav,
    userById: userById,
    getArtist:getArtist
}