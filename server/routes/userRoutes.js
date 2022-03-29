const express = require('express');

const router = express.Router();

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const userCtrl = require('../controllers/userController');
const { userValidation } = require('../middleware/validation/userValidation');
const multer = require('../middleware/multer');

const { User } = require('../models');

router.route('/').get(authentication, userCtrl.getAllUser);

router
  .route('/:userId')
  .get(authentication, userCtrl.getUser)
  .put(
    authentication,
    authorization(User),
    multer,
    userValidation,
    userCtrl.updateUser
  )
  .delete(authentication, authorization(User), userCtrl.deleteUser);

module.exports = router;
