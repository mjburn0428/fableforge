const mongodb = require('../db/connect');

const getAll = async (req, res) => {
    const result = await mongodb
    .getDb()
    .db()
    .collection('thread')
    .find()
    .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
    res.status(500).json({ error: 'An error occurred while retrieving thread' });
  };

module.exports = {
    getAll 
  };