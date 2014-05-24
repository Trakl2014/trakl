/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var traffic = require('./services/traffic-polling');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

// mongoose.connect('mongodb://localhost:27017/trakl');
mongoose.connect('mongodb://trakluser:resulkart@ds033679.mongolab.com:33679/heroku_app25551367');

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

traffic.startPolling();
