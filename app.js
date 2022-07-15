const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

//init express app
const app = express();
//save types json
app.use(express.json());

//limit the number of requests that can be accepted to our server
const limiter = rateLimit({
  max: 500,
  windowMs: 30 * 1000 * 60, //1 min
  message: 'Number of requests have been exceeded'
});

app.use(limiter);

//add security header
app.use(helmet());

//compress response
app.use(compression());

//log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

//Routers
const { usersRouter } = require('./routes/user.routes');
const { gameRouter } = require('./routes/game.routes');
const { consoleRouter } = require('./routes/console.routes');
const { reviewRouter } = require('./routes/review.routes');

////global error Controller
const { globalErrorHandler } = require('./controllers/error.controller');

//utils
const { AppError } = require('./utils/appError.util');

//Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/consoles', consoleRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = { app };