const Model = require('./model')

function addUser(user) {
    const myUser = new Model(user);
    return myUser.save(); // save ya devuelve una promesa
}

function emailValidator(email){
    return new Promise((resolve, reject) => {
        Model.find({email: email}).limit(1).exec((err, email) => {
            if(err){
                reject('Ocurrio un error')
                console.log(email);
            }
            if(email.length === 0){
                resolve('Correo permitido');
            }else{
                reject('Ya existe el correo')
            }
        })
    })
}

function userValidator(user){
    return new Promise((resolve, reject) => {
        Model.find({user: user}).limit(1).exec((err, user) => {
            if(err){
                reject('Ocurrio un error')
            }
            if(user.length === 0){
                resolve('Usario permitido');
            }else{
                reject('Ya existe el usuario')
            }
        })
    })
}

module.exports = {
    add: addUser,
    emailValidator: emailValidator,
    userValidator: userValidator
}