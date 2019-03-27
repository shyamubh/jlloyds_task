const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

// CORS middleware
app.use(function(req, res, next) {

    if (req.url == "/heartbeat") {
        next();
        return;
    }
    var allowedOrigins = [
        '*'
    ];
    if (typeof(req.headers.origin) != 'undefined' && req.headers.origin != '' && req.headers.origin != null) {
        if (allowedOrigins.indexOf(req.headers.origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        } else {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        }
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
        res.setHeader('Access-Control-Request-Headers', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.setHeader("Keep-Alive", "timeout=5, max=500");
        res.setHeader("Server", "Blockstein Server");
        res.setHeader("Developed-By", "IgN!TiON1!");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    } else {
        next()
    }

});

// routes loading...
app.use(require('./controllers'));
/**
 * for uncaughtException log
 */
process.on('uncaughtException', function(err, res) {
    console.log('Caught exception: ' + JSON.stringify(err));
    console.log('%s: %s %s', err.statusCode, JSON.stringify(err.message), JSON.stringify(err.stack));

});
/**
 * NO PAGE FOUND
 */
app.get('*', function(req, res) {
    res.status(404).send("404 page not found");
});

app.listen('3000', function(err, res) {
    console.log('jlloyds task running on 3000')
})