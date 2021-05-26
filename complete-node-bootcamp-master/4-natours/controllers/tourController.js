const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updates tour here>',
    },
  });
};

exports.getAllTours = (req, res) => {
  console.log(req.requsetTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requsetTime,
    // results: tous.length,
    // data: { tours },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  // console.log(tour);

  // res.status(200).json({
  //   status: 'success',
  //   data: { tour },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: newTour,
  });
};
