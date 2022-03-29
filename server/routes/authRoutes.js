const express = require('express');
const authController = require('../controllers/authController');
const {
  signupValidation,
} = require('../middleware/validation/signupValidation');
const { loginValidation } = require('../middleware/validation/loginValidation');

const router = express.Router();

router.post('/signup', signupValidation, authController.signup);
router.post('/login', loginValidation, authController.login);
//router.get('/logout', authController.logout);
//router.get('/forgotpassword', authController.logout);
//router.get('/updatepassword', authController.logout);

module.exports = router;
