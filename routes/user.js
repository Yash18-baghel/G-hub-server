const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const { index, create } = require('../controllers/users');


router.get('/', index);
router.post('/create', authentication, create);

module.exports = router;
