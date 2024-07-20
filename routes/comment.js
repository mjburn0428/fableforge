const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
// const { requiresAuth } = require('express-openid-connect');

router.post('/add_comment', addComment);
// get all comments on a single thread
// router.get('/', commentController.getAllAssociated);

module.exports = router;
