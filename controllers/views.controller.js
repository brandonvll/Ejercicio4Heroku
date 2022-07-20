const { Game } = require('../models/game');

const { catchAsync } = require('../utils/catchAsync.util');

const renderIndex = catchAsync(async (req, res, next) => {
  const games = await Game.findAll();

  res.status(200).render('index', {
    title: 'Render with Pug',
    games
  });
});

module.exports = { renderIndex };
