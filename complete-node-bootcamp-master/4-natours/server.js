const mongoose = require('mongoose');
const dontenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Unhandled Exception 💣  Shutting Down');
  console.log(err.name, err.message);
  process.exit(1);
});

dontenv.config({ path: './config.env' });
const app = require('./app');

//  ##############  i am running my production environment manually
// process.env.Node_Env = 'production';
// ###############
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connection);
    console.log('DB connection successfull');
  });

console.log(process.env);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection 💣  Shutting Down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
