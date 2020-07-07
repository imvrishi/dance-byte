const mongoose = require('mongoose');

const { database } = require('../config');

const connect = () => {

    mongoose.connect(database.DB_URI,{useUnifiedTopology: true, useNewUrlParser: true})
        .then(result => {
            console.log('Connected');
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = connect;




// const MongoClient = require('mongodb').MongoClient;
// const { database } = require('../config');

// let _db;
// const connect = async () => {
//     try {
//         const client = await MongoClient.connect(database.DB_URI,{useUnifiedTopology: true});
//         console.log("Connected to MongoDB Client");
//         _db = client.db();
//     } catch(error) {
//         console.log(error);
//         throw error;
//     }
// };

// const getDb = async () =>{
//     if (! _db) {
//         await connect();
//     }
//     return _db;
//  };

// exports.mongoConnect = connect;
// exports.getDB = getDb;
