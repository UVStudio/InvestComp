const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No client token. Authorization denied.' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.profile = decoded.profile;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is invalid.' });
  }
};
