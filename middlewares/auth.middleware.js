const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');
const JwT = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');

dotenv.config('./config.env');

const protectSession = catchAsync(async (req, res, next) => {
  //console.log(req.headers);
  let token;

  //extract the token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Invalid token', 403));
  }

  // Ask JWT (library), if the token is still volid
  const find = await JwT.verify(token, process.env.JWT_SECRET);

  //Check in db that user have status active and exist
  const user = await User.findOne({
    where: { id: find.id },
    status: 'active'
  });

  if (!user) {
    return next(
      new AppError('the owner of this token doesnt exist anymore', 403)
    );
  }
  req.sessionUser = user;
  next();
});

const protectUserAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new AppError('you don´t own this account', 403));
  }
  next();
};

module.exports = { protectSession, protectUserAccount };
