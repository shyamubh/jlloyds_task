module.exports.validate = function(key, value, type, res) {
    console.log("key, value : ", key, value)

    if (value === '' || value === undefined || value === 'undefined') {
        return { status: false, msg: key + ' is required' };
    }
    if (type == 'email') {
        if (!String(value).match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return { status: false, msg: 'Invalid email address' };
        }
    } else if (type == 'date') {
        //ignor
    } else {
        if (typeof value !== type) {
            return { status: false, msg: key + ' is not a ' + type };
        }
    }
}