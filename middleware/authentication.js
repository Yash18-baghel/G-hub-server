const { JWT_SECRET_KEY } = require("../config");
const jwt = require('jsonwebtoken');
const User = require("../models/User");


const verifyUser = async (req, res, next) => {
  try {
    // Check if user is authenticated, example:
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    var decoded = jwt.verify(token, JWT_SECRET_KEY);
    const decodedData = decoded.user;
    const user = await User.findByPk(decodedData.id || '');
    if (!user) {
      return res.status(401).json({ error: 'wrong token' });
    }

    req.user = decoded.user;
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
  next();
};

const verifyAdmin = async (req, res, next) => {
  if (req.user.role != "admin") return res.status(401).json({ error: "admin access denied" });
  next();
}

const adminV = [verifyUser, verifyAdmin];
module.exports = {
  verifyUser,
  adminV
};
