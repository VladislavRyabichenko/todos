const mongoose = require("mongoose");

async function main() {
  const uri =
    "mongodb+srv://VladislavRiabichenko:Cooler123@freecluster.0v0xtzp.mongodb.net/test";
  await mongoose.connect(uri);
}

module.exports.connectDB = main;
