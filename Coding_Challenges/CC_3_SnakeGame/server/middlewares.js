const notFound = (req, res, next) => {
  // creating error text
  const error = new Error('These are not the routes you\'re looking for young panda! 🐼');
  res.status(404);  // setting status to 404
  next(error);  // forwarding error to my error middleware
};

const errorHandler = (error, req, res, next) => {
  // Setting the status code to Internal Server Error if
  // the original status code was 200 ok
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;

  res.status(statusCode);  // setting the status code
  res.json({
    message: error.message,
    // showing the stack trace only if in development mode
    stack: process.env.NODE_ENV === 'production'? '📚' : error.stack
  });
};

module.exports = {
  notFound,
  errorHandler
};
