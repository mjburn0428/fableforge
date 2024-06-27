const express = require('express');
const router = express.Router();

const threadController = require('../controllers/thread');

router.get('/', threadController.getAll);
router.post('/', threadController.createThread);
router.put('/:id', threadController.updateThread);

module.exports = router;
