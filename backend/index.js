const { MongoClient } = require('mongodb');
require('dotenv').config();
const CoinDAO = require('./dao/CoinDAO');

async function initMongo() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    await CoinDAO.injectDB(client);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = initMongo;
