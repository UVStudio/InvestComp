const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied.' });
  }
  try {
    const decoded = jwt.verify(token, config.get('adminSecret'));
    req.admin = decoded.admin;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is invalid.' });
  }
};
