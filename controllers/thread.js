const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('thread').find();
  result.toArray().then((thread) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(thread);
  });
};


const getSingle = async (req, res, next) => {
  const threadId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('thread')
    .find({ _id: threadId });
  result.toArray().then((list) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list[0]);
  });
};

// TODO: MODIFY this to be able to take in user input

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
      .insertOne(newThread);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// TODO: write updateThread function
const updateThread = async (req, res, next) => {
  try {
    const threadId = new ObjectId(req.params.id);
    const newData = {
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      content: req.body.content,
      tags: req.body.tags,
    };
    // console.log('grant', newData);

    const result = await mongodb
      .getDb()
      .db()
      .collection('thread')
      .findOneAndUpdate({ _id: threadId }, { $set: newData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    res.status(204).json({ message: 'Thread updated succesfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// TODO: write getThreadsByAuthor function

// TODO: write getThreadsByGenre function

const deleteThreadbyId = async (req, res) => {
  try {
    const threadId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('thread').deleteOne({ _id: threadId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({ error: 'We are sorry an error occurred when deleting the thread.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Invalid ThreadID format.' });
  }
};


// TODO: write commentOnThread(post) function

module.exports = {
  getAll,
  createThread,
  updateThread,
  deleteThreadbyId,
};
