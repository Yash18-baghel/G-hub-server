const express = require('express');
const router = express.Router();
const { verifyUser, adminV } = require('../middleware/authentication');
const { addGame, allGames, startGame, deleteGame, editGame, getGame, scheduleGame, endGame, getGameSchedule } = require('../controllers/games');
const responseHandler = require('../middleware/responseHandler');
const { addGameValidator, paginationValidator, sessionActionValidator, paramsValidator } = require('../middleware/validation');

router.route('/')
    .get(verifyUser, paginationValidator, allGames, responseHandler)
    .post(adminV, addGameValidator, addGame, responseHandler);

router.route('/:id')
    .get(verifyUser, getGame, responseHandler)
    .put(adminV, addGameValidator, editGame, responseHandler)
    .delete(adminV, deleteGame, responseHandler);

router.route('/start')
    .post(adminV, sessionActionValidator, startGame, responseHandler);

router.route('/end')
    .post(adminV, sessionActionValidator, endGame, responseHandler);

router.route('/schedule')
    .post(adminV, sessionActionValidator, scheduleGame, responseHandler);

router.route('/:id/schedule')
    .get(verifyUser, paramsValidator, getGameSchedule, responseHandler);



module.exports = router;
