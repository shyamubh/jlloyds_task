const express = require('express'),
    router = express.Router();
const authValidator = require('../validation/authValidation');
const authService = require('../services/auth');

router.post('/register-company', function (req, res) {
    console.log('signup...');
    var input = req.body;
    var checkVal = authValidator.registerCompany(input, res);
    if (checkVal) {
        authService.registerCompany(req, res)
    }
})


module.exports = router;