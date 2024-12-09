// Cole Abney 9/24/2024 IT 302-451 Phase 2 cla34@njit.edu

const express = require('express');
const CoinController = require('./coins.controller');
const CommentController = require('./comments.controller');

const router = express.Router();

router.route('/').get(CoinController.apiGetCoins);
router.route('/:id').get(CoinController.apiGetCoinById); 

// Add comment routes
router.route('/:id/comments').get(CommentController.apiGetComments);
router.route('/:id/comments').post(CommentController.apiPostComment);
router.route('/:id/comments/:commentId').put(CommentController.apiUpdateComment);
router.route('/:id/comments/:commentId').delete(CommentController.apiDeleteComment);

module.exports = router;
