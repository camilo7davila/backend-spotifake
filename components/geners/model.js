const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    nameGener: {type:String, required: true, minlength: [2, "El nombre del genero es invalido"]}
}, {
    timestamps: true
})

const model = mongoose.model('Gener', mySchema);
module.exports = model