const { Console } = require("../models/Console");
//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { GameInConsole } = require("../models/gameInConsole");
const { Game } = require("../models/game");
const { Email } = require("../utils/email.util");

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;
  const { sessionUser } = req;

  const newConsole = await Console.create({
    name,
    company,
  });

  await new Email(sessionUser.email).sendNewConsole(name, company);

  res.status(201).json({
    status: "success",
    newConsole,
  });
});

const aggGameInConsole = catchAsync(async (req, res, next) => {
  const { gameId, consoleId } = req.body;

  const gameInConsole = await GameInConsole.create({ gameId, consoleId });

  res.status(201).json({
    status: "success",
    gameInConsole,
  });
});

const getAllConsole = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll({
    include: { model: Game },
  });

  res.status(200).json({
    status: "success",
    consoles,
  });
});

const updateConsole = catchAsync(async (req, res, next) => {
  const { callConsole } = req;
  const { name } = req.body;

  await callConsole.update({ name });

  res.status(201).json({
    status: "success",
  });
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const { callConsole } = req;
  //await user.destroy();
  await callConsole.update({ status: "disabled" });

  res.status(201).json({
    status: "success",
  });
});

module.exports = {
  createConsole,
  getAllConsole,
  updateConsole,
  deleteConsole,
  aggGameInConsole,
};
