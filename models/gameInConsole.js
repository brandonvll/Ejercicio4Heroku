const { db, DataTypes } = require("../utils/connectDb");

const GameInConsole = db.define("GamesInConsoles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  consoleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = { GameInConsole };
