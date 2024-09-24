const express = require('express');
const cors = require('cors');
const initMongo = require('./index');
const CoinRoute = require('./api/coins.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/cla34/coins', CoinRoute);

initMongo().catch(console.error);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
