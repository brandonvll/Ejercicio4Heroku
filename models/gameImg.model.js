const { db, DataTypes } = require("../utils/connectDb");

const GameImg = db.define("GamesImgs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = { GameImg };