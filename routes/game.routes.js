const express = require('express');
const {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  gameReview
} = require('../controllers/game.controller');

const { gameExists } = require('../middlewares/game.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const { upload } = require('../utils/upload.util');

const gameRouter = express.Router();

//gameRouter.use(protectSession) option 2 of middleware

gameRouter.post('/', protectSession, (upload.single('GameHalo'), createGame));

gameRouter.get('/', getAllGames);

gameRouter.patch('/:id', protectSession, gameExists, updateGame);

gameRouter.delete('/:id', protectSession, gameExists, deleteGame);

gameRouter.post('/reviews/:gameId', protectSession, gameReview);

module.exports = { gameRouter };
