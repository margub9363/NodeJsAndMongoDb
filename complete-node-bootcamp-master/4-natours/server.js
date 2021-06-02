const mongoose = require('mongoose');
const dontenv = require('dotenv');

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
app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});
