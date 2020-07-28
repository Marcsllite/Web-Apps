const notFound = (req, res, next) => {
  const error = new Error('These are not the routes you\'re looking for');
  res.status(404);
  next(error); // forwarding to error handler
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    // making sure the stack isn't shown during production
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
