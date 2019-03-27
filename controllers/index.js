const express = require('express'),
    router = express.Router(),
    config = require('../config/Config');

// middleware to set response type
router.use(function(req, res, next) {
    config.setDefaultHeaders(req, res);
    next()
})
// load unprotected route
router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
module.exports = router;