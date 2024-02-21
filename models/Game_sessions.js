const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Game = require('./Games');

const Game_sessions = sequelize.define('Game_sessions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
}, {
    // Define a composite unique constraint on game_id and user_id
    uniqueKeys: {
        uniqueGameUser: {
            fields: ['game_id', 'user_id']
        }
    },
    timestamps: true,
});

// Define associations
Game_sessions.belongsTo(Game, { foreignKey: 'game_id', onDelete: 'CASCADE' }); // Define a many-to-one association with Game
Game_sessions.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Define a many-to-one association with User

module.exports = Game_sessions;
