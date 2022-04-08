const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { User } = require('../models');

// GET ALL USERS
exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

// GET USER
exports.getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ user });
});

// UPDATE USER
exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedData = req.body;
  const { userId } = req.params;

  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    : undefined;

  const user = await User.update(
    { ...updatedData, profilePic: imageUrl },
    { where: { id: userId }, returning: true, plain: true }
  );

  if (user[1] === 0) {
    return next(
      new AppError(
        "Aucun utilisateur correspondant à cet ID n'a été trouvé",
        404
      )
    );
  }
  // FIXME: article always return null ?
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

// DELETE USER
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const deletedUser = await User.destroy({
    where: { id: userId },
  });

  if (!deletedUser) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({ message: 'Utilisateur supprimé' });
});

// GET CURRENT USER
exports.getCurrentUser = catchAsync(async (req, res, next) => {
  console.log(req.auth.userId);
  const user = await User.findOne({
    where: {
      id: req.auth.userId,
    },
    attributes: ['id', 'isAdmin'],
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ user });
});

/*
// UPDATE CURRENT USER
exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  const updatedData = req.body;
  const { userId } = req.auth;

  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    : undefined;

  const user = await User.update(
    { ...updatedData, image: imageUrl },
    { where: { id: userId }, returning: true, plain: true }
  );

  if (user[1] === 0) {
    return next(
      new AppError(
        "Aucun utilisateur correspondant à cet ID n'a été trouvé",
        404
      )
    );
  }
  // FIXME: article always return null ?
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

// DELETE CURRENT USER
exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.destroy({
    where: { id: req.auth.userId },
  });

  if (!deletedUser) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({ message: 'Utilisateur supprimé' });
});
*/
