const express = require('express');

const router = express.Router();

const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');

const authentication = require('../middleware/authentication');
const adminAccess = require('../middleware/adminAccess');
const authorization = require('../middleware/authorization');
const multer = require('../middleware/multer');
const {
  articleValidation,
} = require('../middleware/validation/articleValidation');
const articleController = require('../controllers/articleController');
const { Article } = require('../models');

// Articles
router
  .route('/')
  .get(authentication, articleController.getAllArticle)
  .post(
    authentication,
    multer,
    articleValidation,
    articleController.createArticle
  );

router
  .route('/:articleId')
  .put(
    authentication,
    authorization(Article),
    multer,
    articleValidation,
    articleController.updateArticle
  )
  .delete(
    authentication,
    adminAccess,
    authorization(Article),
    articleController.deleteArticle
  );

// Comments and Likes
router.use('/:articleId/comments', commentRoutes);
router.use('/:articleId/likes', likeRoutes);

module.exports = router;
