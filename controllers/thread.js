const mongodb = require('../db/connect');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('thread').find();
  result.toArray().then((thread) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(thread);
  });
};

// TODO: write createThread function

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

// TODO: write getThreadsByAuthor function

// TODO: write getThreadsByGenre function

// TODO: write deleteThread function

// TODO: write commentOnThread(post) function

module.exports = {
  getAll,
  createThread,
};
