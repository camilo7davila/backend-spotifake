const mongoose = require('mongoose');

let email_match = [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Coloca un email correcto"]

const Schema = mongoose.Schema;

const mySchema = new Schema({
    firstName: {type:String, required: true, minlength: [4, "El password es muy corto"]},
    lastName: {type:String, required: true, minlength: [4, "El password es muy corto"]},
    user: {type:String, required: true, minlength: [4, "El password es muy corto"]},
    email: {type:String, required: "Correo es obligatorio", match:email_match},
    password: {type:String, minlength: [8, "El password es muy corto"]},
    photo: String,
    creation: Date,
})

const model = mongoose.model('User', mySchema);
module.exports = model