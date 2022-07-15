const express = require("express");
const {
  getAllConsole,
  createConsole,
  updateConsole,
  deleteConsole,
  aggGameInConsole,
} = require("../controllers/console.controller");

//middlewares
const {
  createUserValidators,
} = require("../middlewares/validator.middlewares");
const { consoleExists } = require("../middlewares/console.middleware");
const { protectSession } = require('../middlewares/auth.middleware');

//define enpoints async / await
const consoleRouter = express.Router();

consoleRouter.get("/", getAllConsole);

consoleRouter.post("/", protectSession, createConsole);

consoleRouter.patch("/:id", protectSession, consoleExists, updateConsole);

consoleRouter.delete("/:id", protectSession, consoleExists, deleteConsole);

consoleRouter.post("/assign-console", aggGameInConsole);

module.exports = { consoleRouter };
