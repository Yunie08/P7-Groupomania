const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const catchAsync = require('../utils/catchAsync');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.memoryStorage();
// {
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     // replaces blank spaces by underscores
//     const name = file.originalname.split(' ').join('_').split('.')[0];
//     // apply file extension corresponding to image MIME type
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, `${name}${Date.now()}.${extension}`);
//   },
// });

// Maximal authorized file size
const maxSize = 3 * 1024 * 1024; // 3Mo

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (`${file.mimetype}` in MIME_TYPES) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Formats acceptés : png, jpeg et jpg'));
    }
  },
  limits: { fileSize: maxSize },
}).fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);
console.log('on est dans multer');
module.exports = (req, res, next) => {
  upload(req, res, (err) => (err ? res.status(400).json(err) : next()));
};
