const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

let email_match = [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Coloca un email correcto"]

const Schema = mongoose.Schema;

const mySchema = new Schema({
    firstName: {type:String, required: true, minlength: [2, "El nombre es muy corto"]},
    lastName: {type:String, required: true, minlength: [2, "El apellido es muy corto"]},
    user: {type:String, required: true, minlength: [4, "El password es muy corto"], unique: true},
    email: {type:String, required: true, match:email_match, unique: true},
    password: {type: String, required: true},
    favSong: [{type: Schema.Types.ObjectId, ref:'Song'}],
    photo: String,
}, {
    timestamps: true
})

const model = mongoose.model('User', mySchema);
module.exports = model