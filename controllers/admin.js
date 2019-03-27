const express = require('express'),
    router = express.Router();
const adminValidator = require('../validation/adminValidations');
const adminService = require('../services/admin');

router.get('/list-companies', function(req, res) {
        adminService.listCompanies(req, res);
})

router.post('/get-company-status', function(req, res) {
    var input = req.body;
    var checkVal = adminValidator.validateCompanyName(input, res);
    if (checkVal) {
        adminService.getCompanyStatus(req, res);
    }
})

router.post('/update-company', function(req, res) {
    var input = req.body;
    var checkVal = adminValidator.checkMongoId(input, res);
    if (checkVal) {
        adminService.updateCompany(req, res);
    }
})

module.exports = router;