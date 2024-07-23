const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://admin:XX3liGKfTIt6mSiQ@db.ighaxue.mongodb.net/shop?retryWrites=true'
    //"mongodb+srv://admin:XX3liGKfTIt6mSiQ@db.ighaxue.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DB"
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
