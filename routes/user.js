const express = require('express');
const router = express.Router();
const { verifyUser, adminV } = require('../middleware/authentication');
const { index, allUsers, UpdateUser } = require('../controllers/users');
const responseHandler = require('../middleware/responseHandler');
const { paginationValidator } = require('../middleware/validation');

router.route('/')
    .get(verifyUser, index, responseHandler)
    .put(verifyUser, UpdateUser, responseHandler);


router.get('/all', adminV, paginationValidator, allUsers, responseHandler);

module.exports = router;
