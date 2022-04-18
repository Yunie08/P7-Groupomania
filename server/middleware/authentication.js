const jwt = require('jsonwebtoken');

// Authentication
module.exports = (req, res, next) => {
  try {
    let token;
    // Check if an authentification token is provided
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      throw new Error('Requête non authentifiée');
    }

    // Check authentication token validity
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId, role } = decodedToken;

    // Append userId and role to the request
    req.auth = { userId, role };
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
