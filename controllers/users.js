const User = require('../models/User');

const index = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

const create = (req, res) => {
  res.send('Route 1 Create');
};

module.exports = {
  index,
  create
}