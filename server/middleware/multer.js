const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // replaces blank spaces by underscores
    const name = file.originalname.split(' ').join('_').split('.')[0];
    // apply file extension corresponding to image MIME type
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}${Date.now()}.${extension}`);
  },
});

// Maximal authorized file size
const maxSize = 2 * 1024 * 1024; // 2Mo

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
}).single('image');

module.exports = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      next();
    }
  });
};
