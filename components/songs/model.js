const mongose = require('mongoose');

const Schema = mongose.Schema;

const mySchema = new Schema({
    nameSong: {type:String, required: true, minlength: [2, "El nombre de la cancion no es valida"]},
    durationSong: {type:String, required: true},
    idGener: {type:String, required: true},
    idAuthor: {type:Schema.Types.ObjectId, ref:'User'},
    idAlbum: {type:String, require: true},
    qualification: {type:Number, require: true, minlength: [1, "La calificacion no es valida"]}
},{
    timestamps: true
})

const model = mongose.model('Song', mySchema);
module.exports = model