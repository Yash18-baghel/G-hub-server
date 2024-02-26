const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Games = sequelize.define('Games', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  price_per_hour: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  player_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_at: {
    type: DataTypes.DATE, // Use DATE or DATETIME data type for date and time values
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = Games;
