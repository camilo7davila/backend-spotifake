const Model = require('./model')

function addGener(gener) {
    const myGener = new Model(gener);
    console.log('Agregando modelo genero');
    return myGener.save(); // save ya devuelve una promesa
}

function findGeners(){
    return new Promise((resolve, reject) => {
        Model.find({}).exec((err, gener) => {
            if(err){
                return reject('Se puteo esta vaina');
            }
            if(gener.length === 0){
                return resolve('No hay datos en la coleccion');
            }
            if(gener.length !== 0){
                return resolve(gener)
            }
        })
    })
}

module.exports = {
    add: addGener,
    findGener: findGeners
}