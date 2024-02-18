const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = require('../config');

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    // Create a new user instance with hashed password
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword, // Store the hashed password in the database
    });

    const token = jwt.sign({ ...newUser }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    res.data = { token };
  } catch (error) {
    console.log(error);
    res.error = { msg: "User not Registered" };
  }

  next();
};


const signIn = async (req, res, next) => {
  try {
    // Extract user details from the request body
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User does not exist')
    }

    // Compare the hashed password stored in the database with the hashed version of the password provided by the user
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Password does not match')
    }
    const secretKey = 'yourSecretKey';
    const token = jwt.sign({ ...user }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    res.data = { token };

  } catch (error) {
    res.error = { msg: error.message };
  }
  next();
};

module.exports = {
  register,
  signIn
}