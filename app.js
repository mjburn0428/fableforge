const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
<<<<<<< HEAD
const app = express();
=======
const swaggerRouter = require('./routes/swagger');
>>>>>>> d171704780486fb34e66ba2633fd85d8aad05d8f

const app = express();
const port = process.env.port || 8080;

<<<<<<< HEAD
// Apply CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Custom middleware to set headers (Optional if using CORS middleware)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route middleware
app.use('/', require('./routes'));

=======
app.use(cors()).use(bodyParser.json()).use('/', require('./routes'));
app.use('/', swaggerRouter);

>>>>>>> d171704780486fb34e66ba2633fd85d8aad05d8f
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