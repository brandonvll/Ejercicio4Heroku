const express = require('express');

const { renderIndex } = require('../controllers/views.controller');

const viewRouter = express.Router();

viewRouter.get('/', renderIndex);

module.exports = { viewRouter };
