const express = require('express');
const router = express.Router();
const { verifyUser, adminV } = require('../middleware/authentication');
const { addGame, allGames, startGame, deleteGame, editGame, getGame, scheduleGame, endGame, getGameSchedule, getUserHistory, getUserSessionById, getActiveGameSchedule } = require('../controllers/games');
const responseHandler = require('../middleware/responseHandler');
const { addGameValidator, paginationValidator, sessionActionValidator, paramsValidator } = require('../middleware/validation');
const { upload } = require('../config/multer');

router.route('/')
    .get(paginationValidator, allGames, responseHandler)
    .post(adminV, upload.single('gameImage'), addGameValidator, addGame, responseHandler);

router.route('/user-history')
    .get(verifyUser, paginationValidator, getUserHistory, responseHandler);

router.route('/user-session/:id')
    .get(verifyUser, paramsValidator, getUserSessionById, responseHandler);

router.route('/schedule')
    .post(adminV, sessionActionValidator, scheduleGame, responseHandler)
    .get(adminV, paginationValidator, sessionActionValidator, getActiveGameSchedule, responseHandler);

router.route('/start')
    .post(adminV, sessionActionValidator, startGame, responseHandler);

router.route('/end')
    .put(verifyUser, endGame, responseHandler);

router.route('/:id')
    .get(verifyUser, getGame, responseHandler)
    .put(adminV, addGameValidator, editGame, responseHandler)
    .delete(adminV, deleteGame, responseHandler);

router.route('/:id/schedule')
    .get(verifyUser, paramsValidator, getGameSchedule, responseHandler);

module.exports = router;
