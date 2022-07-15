const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const { AppError } = require('../utils/appError.util');

const sendErrorDev = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'fail',
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const sendErrorProd = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'fail',
    message: err.message || 'Something went very wrong!'
  });
};

const handleUniqueEmailError = () => {
  return new AppError('The email you entered is already taken', 400);
};

const handleJWTError = () => {
  return new AppError('Your token is invalid', 401);
};

const handleJWTExpired = () => {
  return new AppError('Your sesion has expired, Please login again', 401);
};  

const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'SequelizeUniqueConstraintError') {
      error = handleUniqueEmailError();
    } else if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
    } else if (err.name === 'TokenExpiredError') {
      error = handleJWTExpired();
    }
    sendErrorProd(error, req, res);
  }
};

module.exports = { globalErrorHandler };
