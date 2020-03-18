const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    firstName: String,
    lastName: String,
    user: String,
    email: String,
    password: String,
    photo: String,
    creation: Date, 
})

const model = mongoose.model('User', mySchema);
module.exports = model