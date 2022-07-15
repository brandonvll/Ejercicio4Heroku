const express = require('express');
const {
  getAllusers,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user.controller');

//middlewares
const {
  createUserValidators
} = require('../middlewares/validator.middlewares');
const { userExists } = require('../middlewares/users.middleware');
const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');

//define enpoints async / await

const usersRouter = express.Router();

usersRouter.get('/', protectSession, getAllusers);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', loginUser);

usersRouter.patch('/:id', protectSession, userExists, protectUserAccount, updateUser);

usersRouter.delete('/:id', protectSession, userExists, protectUserAccount, deleteUser);

module.exports = { usersRouter };
