const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('thread').find();
    const thread = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(thread);
  } catch (error) {
    console.error('Error retrieving threads:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while retrieving threads' });
  }
};

const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid thread id.');
  }
  try {
    const threadId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('thread')
      .find({ _id: threadId });
    const list = await result.toArray();

    if (list.length === 0) {
      res.status(404).json({ message: 'Thread not found' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list[0]);
  } catch (error) {
    console.error('Error retrieving thread:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while retrieving threads' });
  }
};

const createThread = async (req, res) => {
  try {
    const { title, author, publishedDate, content, tags, metadata } = req.body;

    if (
      !title ||
      !author ||
      !publishedDate ||
      !content ||
      !Array.isArray(tags) ||
      typeof metadata !== 'object'
    ) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const newThread = {
      title,
      author,
      publishedDate,
      content,
      tags,
      metadata: metadata || {},
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection('thread')
      .insertOne(newThread);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateThread = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid thread id to update a thread.');
  }
  try {
    const threadId = new ObjectId(req.params.id);
    const newData = {
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      content: req.body.content,
      tags: req.body.tags,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection('thread')
      .findOneAndUpdate({ _id: threadId }, { $set: newData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    res.status(204).json({ message: 'Thread updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getThreadsByAuthor = async (req, res) => {
  try {
    const author = req.params.author;
    const result = await mongodb
      .getDb()
      .db()
      .collection('thread')
      .find({ author: author })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching threads by author:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getThreadsByTag = async (req, res) => {
  try {
    const tag = req.params.tags;
    const result = await mongodb
      .getDb()
      .db()
      .collection('thread')
      .find({
        $or: [
          { tags: tag }, // for single string tag documents
          { tags: { $in: [tag] } }, //for tags in an array
        ],
      })
      .toArray();
    return threads;
  } catch (error) {
    console.error('Error fetching threads by tag:', error);
    throw new Error('Error fetching threads by tag');
  }
};

const deleteThreadbyId = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid thread id to delete a thread.');
  }
  try {
    const threadId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('thread')
      .deleteOne({ _id: threadId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({
        error: 'We are sorry an error occurred when deleting the thread.',
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Invalid ThreadID format.' });
  }
};

// TODO: write commentOnThread(post) function

module.exports = {
  getAll,
  getSingle,
  getThreadsByTag,
  getThreadsByAuthor,
  createThread,
  updateThread,
  deleteThreadbyId,
};
