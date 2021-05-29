const fs = require('fs');
const mongoose = require('mongoose');
const dontenv = require('dotenv');
const Tour = require('./../../../models/tourModel');

dontenv.config({ path: './config.env' });
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );
// #########
const DB =
  'mongodb+srv://rahman9363:Tannu@1234@cluster0.6pure.mongodb.net/natours-app?retryWrites=true&w=majority';
// #########
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

//   Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully Loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from DB Collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
