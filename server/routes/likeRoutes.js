const express = require('express');

const router = express.Router({ mergeParams: true });

const auth = require('../middleware/authentication');
const likeController = require('../controllers/likeController');

router.route('/').post(auth, likeController.toggleLike);

module.exports = router;
