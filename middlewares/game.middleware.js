const { Game } = require("../models/game");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const gameExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const game = await Game.findOne({ where: { id } });

  if (!game) {
    return next(new AppError("game not found", 404));
  }
  req.callGame = game;
  next();
});

module.exports = { gameExists };