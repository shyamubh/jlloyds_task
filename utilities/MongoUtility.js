const MongoClient = require('mongodb').MongoClient,
    config = require('../config/Config.js');

const url = config.mongodb.url;
/*
 ** This promise will create mongo connection object
 ** Arguments:null
 ** Return : mongo connection object
 */
module.exports.createMongoConnection = function() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {
            if (err) {
                reject(JSON.stringify({ status: false, msg: 'Oops, something went wrong' }));
                return;
            } else {
                resolve(database);
            }


        })
    })
}