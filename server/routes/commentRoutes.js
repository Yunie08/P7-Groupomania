const express = require('express');

const router = express.Router({ mergeParams: true });

const authentication = require('../middleware/authentication');
const adminAccess = require('../middleware/adminAccess');
const authorization = require('../middleware/authorization');
const commentController = require('../controllers/commentController');

const { Comment } = require('../models');

const {
  commentValidation,
} = require('../middleware/validation/commentValidation');

router.route('/').post(authentication, commentController.createComment);

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
    adminAccess,
    authorization(Comment),
    commentController.deleteComment
  );

module.exports = router;
