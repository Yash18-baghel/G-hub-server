const express = require('express');
const router = express.Router();
const { register, signIn } = require('../controllers/auth');
const { regiterValidation, singInValidator } = require('../middleware/validation');
const { handleResponse, handleErrors } = require('../middleware/responseHandler');


router.post('/register', regiterValidation, register, [handleErrors, handleResponse]);
router.post('/sign-in', singInValidator, signIn, [handleErrors, handleResponse]);

module.exports = router;
