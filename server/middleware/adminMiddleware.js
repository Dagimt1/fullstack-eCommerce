const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.is_admin) {
      next();
    } else {
      res.sendStatus(403); // Forbidden
    }
  };
  
  module.exports = adminMiddleware;