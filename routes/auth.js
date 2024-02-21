const express = require('express');
const router = express.Router();
const { register, signIn } = require('../controllers/auth');
const { regiterValidation, singInValidator } = require('../middleware/validation');
const responseHandler = require('../middleware/responseHandler');


router.post('/register', regiterValidation, register, responseHandler);
router.post('/sign-in', singInValidator, signIn, responseHandler);

module.exports = router;
