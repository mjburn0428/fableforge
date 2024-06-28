const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');

const app = express();
const port = process.env.port || 8080;

app.use(cors()).use(bodyParser.json()).use('/', require('./routes'));

// Initialize DB and start server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on Port ${port}`);
    });
  }
});
