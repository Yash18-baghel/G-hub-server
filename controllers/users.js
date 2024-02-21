const User = require('../models/User');
const bcrypt = require('bcrypt');

const index = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findByPk(id);
    res.data = user;
  } catch (error) {
    res.error = { msg: "error" }
  }
  next();
};

const allUsers = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.data = user;
  } catch (error) {
    res.error = { msg: "error" }
  }
  next();
};

module.exports = {
  index,
  allUsers
}