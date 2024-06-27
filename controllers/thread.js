const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('thread').find();
  result.toArray().then((thread) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(thread);
  });
};




const createThread = async (req, res) => {
  try {
    const newThread = req.body;
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

// TODO: write deleteThreadbyId function

// TODO: write commentOnThread(post) function

module.exports = {
  getAll,
  createThread,
  updateThread,
};
