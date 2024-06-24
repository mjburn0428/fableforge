const mongodb = require('../db/connect');

const getAll = async (req, res) => {
    const result = await mongodb
    .getDb()
    .db()
    .collection('thread').find();
    result.toArray().then((thread) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(thread);
    });
  };

module.exports = {
    getAll 
  };