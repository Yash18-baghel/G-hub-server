const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const User = require('./User');
const Game = require('./Game');

const Game_sessions = sequelize.define('Game_sessions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    start_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Define associations
Game_sessions.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Define a many-to-one association with User
Game_sessions.belongsTo(Game, { foreignKey: 'game_id', onDelete: 'CASCADE' }); // Define a many-to-one association with Game

module.exports = Game_sessions;
