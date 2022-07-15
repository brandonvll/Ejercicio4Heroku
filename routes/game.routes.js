const express = require('express');
const {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  gameReview
} = require('../controllers/Game.controller');

const { gameExists } = require('../middlewares/game.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const gameRouter = express.Router();

//gameRouter.use(protectSession) option 2 of middleware 

gameRouter.post('/', protectSession, createGame);

gameRouter.get('/', getAllGames);

gameRouter.patch('/:id', protectSession, gameExists, updateGame);

gameRouter.delete('/:id', protectSession, gameExists, deleteGame);

gameRouter.post('/reviews/:gameId', protectSession, gameReview);

module.exports = { gameRouter };
