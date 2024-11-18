// Cole Abney 10/25/2024 IT 302-451 Phase 3 cla34@njit.edu

const { MongoClient } = require('mongodb');
require('dotenv').config();
const CoinDAO = require('./dao/CoinDAO');
const CommentDAO = require('./dao/CommentDAO');

async function initMongo() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    await CoinDAO.injectDB(client);
    await CommentDAO.injectDB(client);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = initMongo;