const express = require('express');

const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const rateLimit = require('express-rate-limit');

// 1)Global Middleware
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json()); //middleware
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/starter/public`));

app.use((req, res, next) => {
  req.requsetTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
