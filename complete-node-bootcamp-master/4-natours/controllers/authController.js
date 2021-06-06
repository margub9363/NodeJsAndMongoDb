const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  // const newUser = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   passwordConfirm: req.body.passwordConfirm,
  //   photo: req.body.photo,
  //   passwordChangedAt: req.body.passwordChangedAt,
  //   role: req.body.role,
  // });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check it email and password exists
  if (!email || !password)
    return next(new AppError('Please provide email and password', 404));
  // 2) check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting the token and check if its exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access!', 401)
    );
  }
  // 2)Varification  token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3)Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('The user no longer exists!', 401));
  }
  // 4)Check if user change password after the token was issued
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password!, please login again', 401)
    );
  }

  // Grant Access to protected Route
  req.user = freshUser;
  next();
});

//    I am not gettting this concept , so moddified this code , and checked
// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     // roles ['admin','lead-guide'].role = 'user'
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError('You do not have permission to perform this action', 403)
//       );
//     }
//     next();
//   };
// };
exports.restrictTo = () => {
  return (req, res, next) => {
    if (req.user.role === 'user' || req.user.role === 'guide') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get User based on Posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no email with this email address', 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to the User's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your  password? submit a PATCH request with your new password and password confirm to :${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email, //req.body.email
      subject: 'You password reset token , valid for 10 min',
      message,
    });
    // Below three lines of codes is done by me , bcoz the response was stucking
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.createPasswordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later', 500)
    );
  }
});

// exports.forgotPassword = (req, res, next) => {};
