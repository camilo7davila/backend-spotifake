const Model = require('./model')

function addUser(user) {
    const myUser = new Model(user);
    console.log('Adding')    
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

module.exports = {
    add: addUser,
    emailValidator: emailValidator,
    userValidator: userValidator,
    loginValidation: loginValidation
}