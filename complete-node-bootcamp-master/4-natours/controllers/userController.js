const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');

const express = require('express');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // Send Response
  res.status(200).json({
    status: 'success',
    // requestedAt: req.requsetTime,
    results: users.length,
    data: { users },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not yet defined',
  });
};

exports.createNewUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not yet defined',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not yet defined',
  });
};
