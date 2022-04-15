const sharp = require('sharp');
const fs = require('fs');
const catchAsync = require('../utils/catchAsync');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

// TODO: Gestion des erreurs
module.exports = catchAsync(async (req, res, next) => {
  // Target the file depending on its fieldname (image or profilePic)
  const file = req.files.profilePic
    ? req.files.profilePic[0]
    : req.files.image[0];

  // Define new filename
  // replace blank spaces by underscores
  const name = file.originalname.split(' ').join('_').split('.')[0];
  // apply file extension corresponding to image MIME type
  const extension = MIME_TYPES[file.mimetype];
  const filename = `${name}${Date.now()}.${extension}`;

  if (req.files.profilePic) {
    fs.access('images/user', (error) => {
      if (error) {
        fs.mkdirSync('images/user');
      }
    });
    await sharp(file.buffer)
      .resize({ width: 260, height: 260 })
      .toFile(`images/user/${filename}`);
  } else {
    fs.access('images/article', (error) => {
      if (error) {
        fs.mkdirSync('images/article');
      }
    });
    await sharp(file.buffer)
      .resize({ width: 1300, withoutEnlargement: true })
      .toFile(`images/article/${filename}`);
  }
  req.file = { filename: filename };
  next();
});
