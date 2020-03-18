const db = require('mongoose');

db.Promise = global.Promise;
//mongodb+srv://root_bm:<password>@bictiamusic-7kfl1.mongodb.net/test?retryWrites=true&w=majority

async function connect(url){
    await db.connect(url, {
        useNewUrlParser: true,
        dbName: 'BictiaMusic_db',
        useUnifiedTopology: true
    });
    console.log('[db] Conectada con exito');
}

module.exports = connect;