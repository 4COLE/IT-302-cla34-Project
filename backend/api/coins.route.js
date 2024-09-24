const express = require('express');
const CoinController = require('./coins.controller');

const router = express.Router();

router.route('/').get(CoinController.apiGetCoins);

module.exports = router;
