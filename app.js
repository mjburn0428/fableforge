const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
const app = express();

const port = process.env.port || 8080;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

  app.use(cors());
  
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on Port ${port}`);
  }
});
