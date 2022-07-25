const { User } = require('./user.model');
const { Review } = require('./review.model');
const { Game } = require('./game');
const { Console } = require('./Console');
const { GameImg } = require('./gameImg.model');

const initModels = () => {
  //establish model´s relations
  //One user can have much Review
  //principal kuys
  //One-To-Many relationships
  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User);

  Game.hasMany(Review, { foreignKey: 'gameId' });
  Review.belongsTo(Game);

  //Many-To-Many relationships
  Game.belongsToMany(Console, {
    foreignKey: 'consoleId',
    through: 'GamesInConsoles'
  });
  Console.belongsToMany(Game, {
    foreignKey: 'gameId',
    through: 'GamesInConsoles'
  });

  //One-To-Many relationships
  Game.hasMany(GameImg, { foreignKey: 'gameId' });
  GameImg.belongsTo(Game);
};

module.exports = { initModels };
