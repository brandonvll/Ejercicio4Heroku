const { app } = require('./app');
const { initModels } = require('./models/initModels');

const { db, DataTypes } = require('./utils/connectDb');

db.authenticate()
  .then(() => console.log('DataBase authenticate'))
  .catch((err) => console.log(err));

initModels();

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server this rinning on port: ${PORT}`);
});
