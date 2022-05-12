const cloudinary = require('../utils/cloudinary-config');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
  if (req.files) {
    const file = req.files.profilePic
      ? req.files.profilePic[0]
      : req.files.image[0];
    const cloudFolder = req.files.profilePic
      ? 'groupomania/users'
      : 'groupomania/articles';

    const options = {
      folder: cloudFolder,
    };
    const result = await cloudinary.uploader.upload(file.path, options);
    req.file = { url: result.url };
  }
  next();
});
