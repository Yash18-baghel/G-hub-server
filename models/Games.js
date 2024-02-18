const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Games = sequelize.define('Games', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_per_hour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_at: {
    type: DataTypes.DATE, // Use DATE or DATETIME data type for date and time values
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Games;
