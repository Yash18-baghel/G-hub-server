const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  // Define model attributes with data validation and default values
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
    primaryKey: true, // Make it a primary key
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
    validate: {
      isEmail: true, // Validate email format
    },
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'), // Define an enum constraint
    allowNull: false,
    defaultValue: 'user', // Default value is 'user'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure phone is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Define options for the model
  timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

module.exports = User;
