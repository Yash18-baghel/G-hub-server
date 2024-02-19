const Games = require('../models/Games');
const Game_sessions = require('../models/Game_sessions');
const User = require('../models/User');
const { Op } = require('sequelize');

const addGame = async (req, res, next) => {
    try {
        const { title, price_per_hour, player_count = 1 } = req.body;
        const game = await Games.create({
            title,
            price_per_hour,
            player_count,
            start_at: Date.now()
        })

        res.data = { msg: "Game Added Successfully", game };
    } catch (err) {
        res.error = { msg: err.message }
    }
    next();
};

const allGames = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Fetch games with pagination
        const games = await Games.findAll({
            offset: offset,
            limit: limit
        });

        const totalGames = await Games.count();
        const totalPages = Math.ceil(totalGames / limit);

        res.data = {
            games: games,
            currentPage: page,
            totalPages: totalPages,
            totalGames: totalGames
        };
    } catch (error) {
        res.error = { msg: error.message }
    }
    next();
};


const getGame = async (req, res, next) => {
    try {
        const { id } = req.params;
        const games = await Games.findByPk(id);
        res.data = games;
    } catch (error) {
        res.error = { msg: error.message }
    }
    next();

};

const editGame = async (req, res, next) => {

    const { id } = req.params;
    const { title, price_per_hour, player_count } = req.body;
    try {
        const game = await Games.findByPk(id);
        if (!game) throw new Error("Game Does Not Exists!!");
        const updatedData = {
            title: title || game.title,
            price_per_hour: price_per_hour || game.price_per_hour,
            player_count: player_count || game.player_count,
        }
        // Find the game with the specified id and update its data
        const [numAffectedRows, affectedRows] = await Games.update(
            updatedData
            , {
                where: {
                    id: id
                },
                returning: true // Ensure the updated row is returned
            });

        if (numAffectedRows == 0) throw new Error("Game Not Updated!!");
        res.data = {
            updatedData: affectedRows
        }
    } catch (error) {
        res.error = { msg: error.message }
    }
    next();
};

const deleteGame = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedRows = await Games.destroy({ where: { id } });
        if (deletedRows == 0) throw new Error('Game not deleted');
        res.data = { msg: "Game Deleted Successfully" };
    } catch (error) {
        res.error = { msg: error.message }
    }
    next();
};

const startGame = async (req, res, next) => {
    const { game_id, user_id } = req.body;

    const start_at = new Date();
    const end_at = new Date(start_at.getTime() + 60 * 60 * 1000); // Add 1 hour to start_at

    try {
        const user = await User.findByPk(user_id);
        const game = await Games.findByPk(game_id);
        const game_ssn = await Game_sessions.findOne({
            where: { game_id },
            order: [
                ['start_at', 'ASC']
            ]
        });

        if (!user) throw new Error("User does not Exists!!")
        if (!game) throw new Error("Game does not Exists!!")
        if ((game_ssn && game_ssn.status) || game.status) throw new Error("Game already in use!!")

        // Check if a record with the same game_id and user_id exists
        let gameSession = await Game_sessions.findOne({
            where: {
                game_id: game_id,
                user_id: user_id
            }
        });

        if (gameSession) {
            // Update existing record
            gameSession.start_at = start_at;
            gameSession.end_at = end_at;
            gameSession.status = true;
            await gameSession.save();
        } else {
            // Create new record
            gameSession = await Game_sessions.create({
                game_id: game_id,
                user_id: user_id,
                start_at: start_at,
                end_at: end_at,
                status: true
            });
        }


        // Find the game with the specified id and update its data
        await Games.update({ status: true }, {
            where: {
                id: game_id
            },
        });
        res.data = { gameSession };
    } catch (error) {
        res.error = { msg: error.message }
    }
    next();

}

const endGame = async (req, res, next) => {
    const { game_id, user_id } = req.body;

    try {
        const user = await User.findByPk(user_id);
        const game = await Games.findByPk(game_id);
        const game_ssn = await Game_sessions.findOne({
            where: { game_id, user_id },
            order: [
                ['start_at', 'ASC']
            ]
        });

        if (!game_ssn || !game_ssn.status) throw new Error("Game Session Not Active!!");


        if (!user) throw new Error("User does not Exists!!");
        if (!game) throw new Error("Game does not Exists!!");

        // Find the game with the specified id and update its data
        await Game_sessions.update(
            {
                status: false,
                end_at: new Date()
            },
            {
                where: {
                    game_id
                },
            });

        // Find the game with the specified id and update its data
        await Games.update(
            {
                status: false
            },
            {
                where: {
                    id: game_id
                },
            });

        res.data = { msg: "Game Session Ended" };
    } catch (error) {
        res.error = { msg: error.message }
    }
    next();

};

const scheduleGame = async (req, res, next) => {
    const { game_id, user_id } = req.body;

    try {
        const user = await User.findByPk(user_id);
        const game = await Games.findByPk(game_id);
        const game_ssn = await Game_sessions.findOne({
            where: {
                game_id
            },
            order: [
                ['start_at', 'DESC']
            ]
        });

        const start_at = game_ssn.end_at;
        const end_at = new Date(start_at.getTime() + 60 * 60 * 1000); // Add 1 hour to start_at

        if (!user) throw new Error("User does not Exists!!")
        if (!game) throw new Error("Game does not Exists!!")

        // Check if a record with the same game_id and user_id exists
        let gameSession = await Game_sessions.findOne({
            where: {
                game_id: game_id,
                user_id: user_id
            }
        });

        if (gameSession.status) throw new Error(`Session is Already Active till: ${gameSession.end_at.toLocaleString()}`)

        if (gameSession) {
            // Update existing record
            gameSession.start_at = start_at;
            gameSession.end_at = end_at;
            await gameSession.save();
        } else {
            // Create new record
            gameSession = await Game_sessions.create({
                game_id: game_id,
                user_id: user_id,
                start_at: start_at,
                end_at: end_at
            });
        }

        res.data = { gameSession };
    } catch (error) {
        res.error = { msg: error.message }
    }
    next();
};

const getGameSchedule = async (req, res, next) => {
    const { id } = req.params;
    const currentTime = new Date();
    try {
        const game_ssn = await Game_sessions.findAll({
            where: {
                game_id: id,
                start_at: {
                    [Op.gt]: currentTime // Use Op.gt (greater than) operator
                }
            },
            order: [
                ['start_at', 'DESC']
            ]
        });

        res.data = { game_ssn };
    } catch (error) {
        res.error = { msg: error.message }
    }
    next();
};

module.exports = {
    addGame,
    allGames,
    getGame,
    editGame,
    deleteGame,
    startGame,
    endGame,
    scheduleGame,
    getGameSchedule
}