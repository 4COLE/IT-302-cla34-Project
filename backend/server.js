// Cole Abney 10/25/2024 IT 302-451 Phase 3 cla34@njit.edu

const express = require('express');
const cors = require('cors');
const initMongo = require('./index');
const CoinRoute = require('./api/coins.route');
const CommentRoute = require('./api/comments.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/cla34/coins', CoinRoute);
app.use('/api/v1/cla34/comments', CommentRoute);

initMongo().catch(console.error);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
