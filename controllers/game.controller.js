const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { Game } = require('../models/game');
const { Review } = require('../models/review.model.js');
const { Console } = require('../models/Console');

const { Email } = require('../utils/email.util');
const { catchAsync } = require('../utils/catchAsync.util');
const { storage } = require('../utils/firebase.util');

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;
  const { sessionUser } = req;

  const newGame = await Game.create({
    title,
    genre
  });

  if (req.files.length > 0) {
    const filesPromises = req.files?.map(async (file) => {
      const imgRef = ref(
        storage,
        `games/${Date.now()}_${req.file.originalname}`
      );
      const imgRes = await uploadBytes(imgRef, req.file.buffer);

      return await GameImg.create({
        gameId: newGame.id,
        imgUrl: imgRes.metadata.fullPath
      });
    });
    await Promise.all(filesPromises);
  }
  //Send mail when game has been create
  await new Email(sessionUser.email).sendNewGame(title, genre);

  res.status(201).json({
    status: 'success',
    newGame
  });
});

const getAllGames = catchAsync(async (req, res, next) => {
  //map async
  const gameimgsPromises = game.GameImg.map(async (gameImg) => {
    const imgRef = ref(storage, gameImg.imgUrl);

    const imgFullPath = await getDownloadURL(imgRef);
    gameImg.imgUrl = imgFullPath;
    return gameImg;
  });

  const gameImgsResolved = await Promise.all(gameimgsPromises);

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
