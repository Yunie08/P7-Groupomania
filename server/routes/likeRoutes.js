const express = require('express');

const router = express.Router({ mergeParams: true });

const auth = require('../middleware/authentication');
const likeController = require('../controllers/likeController');

router
  .route('/')
  .get(auth, likeController.getLikesFromArticle)
  .post(auth, likeController.likeHandle);

module.exports = router;
