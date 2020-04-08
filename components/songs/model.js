const mongose = require('mongoose');

const Schema = mongose.Schema;

const mySchema = new Schema({
    nameSong: {type:String, required: true, minlength: [2, "El nombre de la cancion no es valida"]},
    durationSong: {type:String, required: true},
    idGener: {type:Schema.Types.ObjectId, required: true, ref:'Gener'},
    idAuthor: {type:Schema.Types.ObjectId, ref:'User'},
    idAlbum: {type:Schema.Types.ObjectId, require: true, ref:'Album'},
    qualification: {type:Number, require: true, max: 5, min: 1},
    songFile: {type:String, required: true},
    imgSong: {type:String, required: true}
},{
    timestamps: true
})

const model = mongose.model('Song', mySchema);
module.exports = model