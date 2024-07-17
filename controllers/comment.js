const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const addComment = async (req, res, next) => {
  const { threadId, author, content } = req.body;

  if (!threadId || !author || !content) {
    return res.status(400).json({ error: 'Missing Data' });
  }

  const comment = {
    threadId: ObjectId(threadId),
    author,
    publishedDate: new Date(),
    content,
    metadata: {},
  };
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('comments')
      .insertOne(comment);
    res
      .status(201)
      .json({
        message: 'Comment added successfully',
        commentId: result.insertedId,
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

module.exports = { addComment };
