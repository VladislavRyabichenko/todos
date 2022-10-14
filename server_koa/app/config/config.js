// import { MongoClient } from "mongodb";
const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://VladislavRiabichenko:Cooler123@freecluster.0v0xtzp.mongodb.net/test";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(-1);
    console.log("Err");
  }
  console.log("Successfully connected to MongoDB");
});

module.exports = client;
