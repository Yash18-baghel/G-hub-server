const authentication = (req, res, next) => {
    // Check if user is authenticated, example:
    if (!req.body.authorized) {
      return res.status(401).send('Unauthorized');
    }
    next();
};
  
module.exports = authentication;
  