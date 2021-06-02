const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  // Mongoose seems to be updated we dont have value in ou error which shown in coding
  const message = `Duplicate field value. Please check!`;
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
  // ############ To run in Production Environment
  process.env.NODE_ENV = 'production';

  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV);
    // it is observed we have to give  process.env.NODE_ENV
    // ############
    sendErrorDev(err, res);
  } else {
    // We are assuming the environmne to be as -> production
    let error = { ...err };
    // ########
    console.log(process.env.NODE_ENV);
    // Also in below lines there has to be error.name and error.code
    // ########
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFields(error);

    sendErrorProd(error, res);
  }
};
