const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://adrian:yyxalbJRsj84WQBC@cluster0.tqe0soz.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected to MongoDB");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {  
    return _db;
  }
  throw "Database not connected";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;