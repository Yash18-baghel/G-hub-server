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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const users = await User.findAll({
      offset,
      limit
    });


    const totalUsers = await User.count();
    const totalPages = Math.ceil(totalUsers / limit);

    res.data = {
      users,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers
    };
  } catch (error) {
    res.error = { msg: "error" }
  }
  next();
};

const UpdateUser = async (req, res, next) => {

  const { id } = req.user;
  const { name, email, phone } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User Not Found!!");
    const updatedData = {
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
    }
    // Find the User with the specified id and update its data
    const [numAffectedRows, affectedRows] = await User.update(
      updatedData,
      {
        where: {
          id
        },
        returning: true // Ensure the updated row is returned
      });

    if (numAffectedRows == 0) throw new Error("user Not Updated!!");
    res.data = {
      updatedData: affectedRows
    }
  } catch (error) {
    res.error = { msg: error.message }
  }
  next();
};

module.exports = {
  index,
  allUsers,
  UpdateUser
}