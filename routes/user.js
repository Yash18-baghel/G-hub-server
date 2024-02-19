const express = require('express');
const router = express.Router();
const { verifyUser, adminV } = require('../middleware/authentication');
const { index, allUsers } = require('../controllers/users');
const responseHandler = require('../middleware/responseHandler');



router.get('/', verifyUser, index, responseHandler);
router.get('/all', adminV, allUsers, responseHandler);

module.exports = router;
