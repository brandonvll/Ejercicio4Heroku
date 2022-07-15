const bcryptjs = require('bcryptjs');
const JwT = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync.util');
const { Review } = require('../models/review.model');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  //Has Password
  const salt = await bcryptjs.genSalt(12);
  const hashPassword = await bcryptjs.hash(password, salt); // salt

  const newUser = await User.create({
    name,
    email,
    password: hashPassword
  });

  //Remove password from response
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    newUser
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email
  const user = await User.findOne({
    where: {
      email,
      status: 'active'
    }
  });

  if (!user) {
    return next(new AppError('Credencials Invalid', 400));
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new AppError('Credencials Invalid', 400));
  }

  //JwT = JsonWebToken
  const token = await JwT.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.status(200).json({
    status: 'success',
    token
  });
});

const getAllusers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    include: [{ model: Review, attributes: ['id', 'comment'] }],
    attributes: ['id', 'name', 'email', 'status']
  });

  res.status(200).json({
    status: 'success',
    users
  });
  next();
});

const updateUser = catchAsync(async (req, res, next) => {
  const { callUser } = req;
  const { name } = req.body;

  await callUser.update({ name });

  res.status(201).json({
    status: 'success'
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { callUser } = req;
  //await user.destroy();
  await callUser.update({ status: 'disabled' });

  res.status(201).json({
    status: 'success'
  });
});

module.exports = {
  loginUser,
  getAllusers,
  createUser,
  updateUser,
  deleteUser
};
