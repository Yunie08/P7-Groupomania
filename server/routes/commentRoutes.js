const express = require('express');

const router = express.Router({ mergeParams: true });

const authentication = require('../middleware/authentication');
const grantAccess = require('../middleware/grantAccess');
const authorization = require('../middleware/authorization');
const commentController = require('../controllers/commentController');

const { Comment } = require('../models');

const {
  commentValidation,
} = require('../middleware/validation/commentValidation');

router
  .route('/')
  .post(authentication, commentController.createComment)
  .get(authentication, commentController.getAllComment);

router
  .route('/:commentId')
  .put(
    authentication,
    authorization(Comment),
    commentValidation,
    commentController.updateComment
  )
  .delete(
    authentication,
    grantAccess('moderator', 'admin'),
    authorization(Comment),
    commentController.deleteComment
  );

module.exports = router;
