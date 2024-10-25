// Cole Abney 10/25/2024 IT 302-451 Phase 3 cla34@njit.edu

const express = require('express');
const CommentController = require('./comments.controller');

const router = express.Router();

router.route('/').post(CommentController.apiPostComment);
router.route('/:id').put(CommentController.apiUpdateComment);
router.route('/:id').delete(CommentController.apiDeleteComment);

module.exports = router;

