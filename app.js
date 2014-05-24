/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var user = require('./routes/user');
var api = require('./routes/api');
var submitted = require('./routes/submitted');
var UrbanAirshipPush = require('urban-airship-push');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

mongoose.connect('mongodb://localhost:27017/trakl');

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


// Keep for testing sanity (existing app)
/*
for qt bike fest dev
var config = {
    key: 'g1XE7nuhSqiJ9Xbb8GIv4w',
    secret: 'rV98lhldS4y7HZykNk0UBQ',
    masterSecret: '4kPmYtM5Ta206Y2YCdYmFg'
};
*/


//for qt bike trakl dev
var config = {
    key: 'X5diE07QRKCKvxwvIO9lCg',
    secret: 'DNls_9ffQ6yj8LxO5s1EEw',
    masterSecret: 'H6NsAzvZRt61VymecApXdg'
};

var dataNew;
var urbanAirshipPush = new UrbanAirshipPush(config);

app.post('/', function(req, res) {

    var message = req.body.message;
    // errors = validate(message),
    res.locals.message = message;
    // res.redirect('/submitted');

    var pushInfo = {
        device_types: 'all',
        audience: 'all',
        notification: {
            alert: res.locals.message
        }
    };

    function render(isOk) {
        // res.render('index', locals);
        res.render('submitted', {
            title: message,
            opID: isOk
        });
    } 

    urbanAirshipPush.push.send(pushInfo, function(err, data) {

        if (err) {
            // TODO: Handle error
            return;
        }

        res.locals.ok = data.ok;
        console.log(data);
        console.log(data + res.locals.ok);
        console.log(data.ok);
        // return res.locals.ok;
        render(res.locals.ok);

    });

    console.log(res.locals.ok)

});
