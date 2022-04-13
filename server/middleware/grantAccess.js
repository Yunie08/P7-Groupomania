// Grant authorization to moderators and / or administrators
module.exports =
  (...roles) =>
  (req, res, next) => {
    // We check if current user has an authorized role
    const isAuthorized = roles.includes(req.auth.role);

    req.auth.isAuthorized = isAuthorized;

    next();
  };
