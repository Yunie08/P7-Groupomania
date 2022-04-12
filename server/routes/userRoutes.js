const express = require('express');

const router = express.Router();

const authentication = require('../middleware/authentication');
const adminAccess = require('../middleware/adminAccess');
const authorization = require('../middleware/authorization');
const userCtrl = require('../controllers/userController');
const { userValidation } = require('../middleware/validation/userValidation');
const {
  passwordValidation,
} = require('../middleware/validation/passwordValidation');
const multer = require('../middleware/multer');

const { User } = require('../models');

router.route('/').get(authentication, userCtrl.getAllUser);
router.route('/current').get(authentication, userCtrl.getCurrentUser);
router
  .route('/:userId/profile')
  .put(
    authentication,
    authorization(User),
    multer,
    userValidation,
    userCtrl.updateUser
  );
router
  .route('/:userId/password')
  .put(
    authentication,
    authorization(User),
    multer,
    passwordValidation,
    userCtrl.updatePassword
  );
router
  .route('/:userId')
  .get(authentication, userCtrl.getUser)
  .delete(
    authentication,
    adminAccess,
    authorization(User),
    userCtrl.deleteUser
  );

module.exports = router;
