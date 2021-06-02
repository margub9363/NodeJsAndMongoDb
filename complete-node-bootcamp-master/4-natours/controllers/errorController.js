const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational Error: trusted Error , we can send this to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error: dont want to leak details to client
  else {
    // 1) Log the error
    console.error('Error💥');

    // 2) Send generic Error message
    res.status(500).json({
      status: 'Error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // ############
  if (process.env.NODE_ENV === 'development') {
    // it is observed we have to give  process.env.NODE_ENV
    // ############
    sendErrorDev(err, res);
  } else {
    // We are assuming the environmne to be as -> production
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};
