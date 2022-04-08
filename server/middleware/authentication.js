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
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId } = decodedToken;
    req.auth = { userId };
    console.log(req.auth.userId);
    // if the userId in the token correspond to the userId provided in the request body
    if (
      (req.body.userId || req.body.userId === '') &&
      req.body.userId !== userId
    ) {
      throw new Error('Requête non autorisée');
    } else {
      // proceed to next middleware
      next();
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
