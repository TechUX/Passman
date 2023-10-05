const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const database = process.env.MONGO_DB_NAME;
if (!process.env.MySQL_DB_HOST) {
  let usemongo = true;
  if (
    !["127.0.0.1:27017", "localhost:27017"].includes(process.env.MONGO_DB_HOST)
  ) {
    var conString = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_NAME}.${process.env.MONGO_DB_HOST}/`;
    console.log("Connecting to Remote Database : " + process.env.MONGO_DB_HOST);
  } else {
    var conString = `mongodb://${process.env.MONGO_DB_HOST}/`;
    console.info(
      `Connecting to local MongoDB server. [Database : ${process.env.MONGO_DB_NAME} ]`
    );
  }
} else {
  console.log("SQL is used");
}

const client = new MongoClient(conString) ;

async function dbConnect() {
    let result = await client.connect() ;
    db = result.db(database) ;
    return db.collection('accounts') ;
}


module.exports = dbConnect ;