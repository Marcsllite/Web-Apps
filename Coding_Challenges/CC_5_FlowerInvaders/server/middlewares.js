const notFound = (req, reslt, next) => {
  // creating error text
  const error = new Error('These are not the routes you\'re looking for young panda! 🐼');
  reslt.status(404);  // setting status to 404
  next(error);  // forwarding error to my error middleware
};

const errorHandler = (error, req, reslt, next) => {
  // Setting the status code to Internal Server Error if
  // the original status code was 200 ok
  const statusCode = reslt.statusCode == 200 ? 500 : reslt.statusCode;

  reslt.status(statusCode);  // setting the status code
  reslt.json({
    message: error.message,
    // showing the stack trace only if in development mode
    stack: process.env.NODE_ENV === 'production'? '📚' : error.stack
  });
};

module.exports = {
  notFound,
  errorHandler
};
