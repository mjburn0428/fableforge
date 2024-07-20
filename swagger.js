const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Team 2 Author App',
    description:
      'Welcome to FabelForge. Here is where you can post stories to inspire others.',
  },

  host: 'fableforge.onrender.com',
};
const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
