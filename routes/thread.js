const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread');
const { requiresAuth } = require('express-openid-connect');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), threadController.getAll);
router.get('/tag/:tag', requiresAuth(),threadController.getThreadsByTag); // Updated path for getThreadsByTag
router.post('/', requiresAuth(), threadController.createThread);
router.put('/:id', requiresAuth(), threadController.updateThread);
router.get('/:id', threadController.getSingle);
router.get('/', requiresAuth(), threadController.getThreadsByTag);
router.get('/', requiresAuth(), threadController.getThreadsByTag);
router.post(
  '/',
  requiresAuth(),
  validation.saveThread,
  threadController.createThread
);
router.put(
  '/:id',
  requiresAuth(),
  validation.saveThread,
  threadController.updateThread
);
router.delete('/:id', requiresAuth(), threadController.deleteThreadbyId);

// New route for getting threads by author
router.get(
  '/author/:author',
  requiresAuth(),
  threadController.getThreadsByAuthor
);

module.exports = router;
