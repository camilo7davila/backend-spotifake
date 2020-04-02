const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mySchema = new Schema({//Schema of collections
    nameAlbum: {type:String, required: true, minlength: [2, "El nombre del album no es valido"]},
    //image: {type:String},
    //songs: {},
    dateAlbum:{type:date, required: true},
    idAutor:{type:String, required:true}
}, {
    timestamps: true
})


const model = mongoose.model('Album', mySchema);
module.exports = model 