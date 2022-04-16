const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes
  windowMs: 0.5 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
  message:
    'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
