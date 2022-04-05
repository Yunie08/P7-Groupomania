const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');

module.exports = catchAsync(async (req, res, next) => {
  const { userId } = req.auth;

  const isAdmin = await User.findOne({ where: { id: userId, isAdmin: true } });
  // The the current user is admin we pass the information to next middleware
  if (isAdmin) {
    req.auth.isAdmin = true;
  }

  next();
});
