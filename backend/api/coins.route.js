// Cole Abney 9/24/2024 IT 302-451 Phase 2 cla34@njit.edu

const express = require('express');
const CoinController = require('./coins.controller');

const router = express.Router();

router.route('/').get(CoinController.apiGetCoins);
router.route('/:id').get(CoinController.apiGetCoinById); 

module.exports = router;
