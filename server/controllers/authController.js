const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { User } = require('../models');

// SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const { passwordConfirm, role, ...userData } = req.body;
  const [user, created] = await User.findOrCreate({
    where: { email: userData.email },
    defaults: {
      ...userData,
      password: hash,
    },
  });
  if (!created) {
    return next(new AppError('Cet email est déjà utilisé', 400));
  }
  res.status(201).json({ message: 'Utilisateur créé' });
});

// LOGIN
exports.login = async (req, res, next) => {
  const userEmail = req.body.email;
  const user = await User.findOne({
    where: {
      email: userEmail,
    },
  });
  // if user exists
  if (!user) {
    return next(new AppError('Email incorrect', 401));
  }

  const passwordIsValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  // and password is valid
  if (!passwordIsValid) {
    return next(new AppError('Mot de passe incorrect', 401));
  }

  // send authentication token
  res.status(200).json({
    userId: user.id,
    token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    }),
  });
};

// TODO: LOGOUT
// TODO: FORGOTTEN PASSWORD
// TODO: UPDATE PASSWORD
