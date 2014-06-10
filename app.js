/**
 * Module dependencies.
 */
require('newrelic');
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
// var user = require('./routes/user');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');


var traffic = require('./services/traffic-polling');
var app = express();
require('./config/passport')(passport); // pass passport for configuration
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');


// set up our express application
// app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(path.join(__dirname, 'public')));




// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use('/', routes);
app.use('/api', api);

// mongoose.connect('mongodb://localhost:27017/trakl');
mongoose.connect('mongodb://trakluser:resulkart@ds033679.mongolab.com:33679/heroku_app25551367');

http.createServer(app).listen(app.get('port'), function() {
    console.log('magic happening on port ' + app.get('port'));
});

traffic.startPolling();


var body = JSON.stringify({
    "text": "TrAkl Heroku serever started"
});
var slackStatusWebhook = {
    host: 'trakl.slack.com',
    path: '/services/hooks/incoming-webhook?token=wiGtrM8aYAnbASZ10CIKGD7L',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
    }

}


var req = https.request(slackStatusWebhook, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

     
});

if (process.env.PORT) {

    req.write(body);
    req.end();
}


req.on('error', function(e) {
    console.error(e);
});

// this is temp to handle errors and keep server from crashing

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

var UA_KEY = process.env['UA_KEY'] || "on local ua key not set";
var UA_SECRET = process.env['UA_SECRET'] || "on local ua secret not set";
var UA_MASTER_SECRET = process.env['UA_MASTER_SECRET'] || "on local master secret key not set";
console.log(UA_KEY);
console.log(UA_SECRET);
console.log(UA_MASTER_SECRET);