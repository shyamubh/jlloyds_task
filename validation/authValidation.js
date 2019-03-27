const validator = require('./commonValidator');

module.exports.registerCompany = function(input, res) {
    var response = validator.validate('email', input.email, 'email', res);
    if (response && !response.status) {
        res.json(response);
        return;
    }
    response = validator.validate('firstName', input.firstName, 'string', res);
    if (response && !response.status) {
        res.json(response);
        return;
    }
    response = validator.validate('lastName', input.lastName, 'string', res);
    if (response && !response.status) {
        res.json(response);
        return;
    }
    response = validator.validate('companyName', input.companyName, 'string', res);
    if (response && !response.status) {
        res.json(response);
        return;
    }
    response = validator.validate('licenceStartDate', input.licenceStartDate, 'string', res);
    if (response && !response.status) {
        res.json(response);
        return;
    }
    response = validator.validate('licenceEndDate', input.licenceEndDate, 'string', res);
    if (response && !response.status) {
        res.json(response);
        return;
    }
    return true;
}
