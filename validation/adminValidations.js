const validator = require('./commonValidator');

module.exports.validateCompanyName = function(input, res) {
    var response = validator.validate('companyName', input.companyName, 'string', res);
    if (response && !response.status) {
        res.json(response);
        return;
    }
    return true;
}

module.exports.checkMongoId = function(input, res) {
    var response = validator.validate('_id', input._id, 'string', res);
    if (response && !response.status) {
        res.json(response);
        return;
    }
    return true;
}
