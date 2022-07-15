const { app } = require("./app");

const { User } = require("./models/user.model");
const { Review } = require("./models/review.model");
const { Game } = require("./models/game");
const { Console } = require("./models/Console");

const { db, DataTypes } = require("./utils/connectDb");

db.authenticate()
  .then(() => console.log("DataBase authenticate"))
  .catch((err) => console.log(err));

//establish model´s relations
//One user can have much Review
//principal kuys
//One-To-Many relationships
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User);

Game.hasMany(Review, { foreignKey: "gameId" });
Review.belongsTo(Game);

//Many-To-Many relationships
Game.belongsToMany(Console, { foreignKey: 'consoleId', through: "GamesInConsoles" });
Console.belongsToMany(Game, { foreignKey: 'gameId', through: "GamesInConsoles" });

db.sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server this rinning on port: ${PORT}`);
});
