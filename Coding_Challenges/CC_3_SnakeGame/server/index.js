const express = require('express');
const path = require('path');
const serveIndex = require('serve-index');

// Middlewares
// Logger for incoming requests
const morgan = require('morgan');
// Used to add/remove headers for security
const helmet = require('helmet');
// Error Handling middleware
const middlewares = require('./middlewares');

require('dotenv').config();

const app = express();

// invoking morgan with common format
app.use(morgan('common'));
app.use(helmet());  // making sure helmet is used
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', serveIndex(path.join(__dirname, '../public/css')));
app.use('/img', serveIndex(path.join(__dirname, '../public/img')));
app.use('/js', serveIndex(path.join(__dirname, '../public/js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

// Not found Middleware
app.use(middlewares.notFound);

// default middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT;
app.listen(port, ()=> {
  console.log(`Listening at http://localhost:${port}`);
});
