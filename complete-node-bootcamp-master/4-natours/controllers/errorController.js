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

  if (process.env === 'development') {
    sendErrorDev(err, res);
  } else if (process.env === 'production') {
    sendErrorProd(err, res);
  }
};
