const jwt = require('jsonwebtoken');

// Authentication
module.exports = (req, res, next) => {
  try {
    let token;
    // if an authentification token is provided
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      throw new Error('Requête non authentifiée');
    }

    // Check token validity
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId } = decodedToken;
    req.auth = { userId };
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
