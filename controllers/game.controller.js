const { Game } = require('../models/game');
const { catchAsync } = require('../utils/catchAsync.util');
const { Review } = require('../models/review.model.js');
const { Console } = require('../models/Console');
const { Email } = require('../utils/email.util');

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;

  const newGame = await Game.create({
    title,
    genre
  });

  new Email().sendNewGame();

  res.status(201).json({
    status: 'success',
    newGame
  });
});

const getAllGames = catchAsync(async (req, res, next) => {
  const game = await Game.findAll({
    include: [{ model: Review, attributes: ['id', 'comment'] }],
    attributes: ['id', 'title', 'genre'],
    include: { model: Console }
  });

  res.status(200).json({
    status: 'success',
    game
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { callGame } = req;
  const { title } = req.body;

  await callGame.update({ title });

  res.status(201).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
  const { callGame } = req;

  await callGame.destroy();

  res.status(201).json({
    status: 'success'
  });
});

const gameReview = catchAsync(async (req, res, next) => {
  const { userId, gameId, comment } = req.body;
  
  const newReview = await Review.create({
    userId,
    gameId,
    comment
  });

  res.status(201).json({
    status: 'success',
    newReview
  });
  next();
});

module.exports = {
  createGame,
  getAllGames,
  updateGame,
  deleteGame,
  gameReview
};
