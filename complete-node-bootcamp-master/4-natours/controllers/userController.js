const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const express = require('express');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  //   Object.keys(obj).forEach(el => {if(allowedFields.includes(el))})
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

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

exports.UpdateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user post a password data
  if (req.body.password || req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates, Please use /updateMyPassword',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields name that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 3)Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: { user: updatedUser },
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

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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
