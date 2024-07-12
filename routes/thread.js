const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), threadController.getAll);
router.get('/', threadController.getThreadsByTag);
router.post('/', requiresAuth(), threadController.createThread);
router.put('/:id', requiresAuth(), threadController.updateThread);
router.delete('/:id', requiresAuth(), threadController.deleteThreadbyId);

module.exports = router;
