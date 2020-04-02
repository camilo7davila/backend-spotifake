const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    creator: String
}, {
    timestamps: true
})

const model = mongoose.model('Genre', mySchema);
module.exports = model