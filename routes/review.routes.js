const express = require("express");
const { gameReview } = require("../controllers/game.controller");

const reviewRouter = express.Router();

reviewRouter.post("/:id", gameReview);

module.exports = { reviewRouter };
