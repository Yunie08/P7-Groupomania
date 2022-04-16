const express = require('express');
const authController = require('../controllers/authController');
const {
  signupValidation,
} = require('../middleware/validation/signupValidation');
const { loginValidation } = require('../middleware/validation/loginValidation');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/signup', rateLimiter, signupValidation, authController.signup);
router.post('/login', loginValidation, authController.login);

module.exports = router;
