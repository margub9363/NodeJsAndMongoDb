const Tour = require('./../models/tourModel');

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

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();

    const newTour = await Tour.create(req.body).then();

    res.status(201).json({
      status: 'success',
      // data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
