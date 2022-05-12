const multer = require('multer');
const path = require('path');

// Mime types / file extension translation
const MIME_TYPES = require('../utils/mimeTypes');

// Maximal authorized file size
const maxSize = 3 * 1024 * 1024; // 3Mo

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  filename: (req, file, callback) => {
    // replaces blank spaces by underscores
    const name = file.originalname.split(' ').join('_').split('.')[0];
    // apply file extension corresponding to image MIME type
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}${Date.now()}.${extension}`);
  },
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

module.exports = (req, res, next) => {
  upload(req, res, (err) => (err ? res.status(400).json(err) : next()));
};
