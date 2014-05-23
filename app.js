/**
 * Module dependencies.
 */

var UrbanAirshipPush = require('urban-airship-push');

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var submitted = require('./routes/submitted');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/submitted', submitted.submit);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

//for qt bike fest dev
// var config = {
//     key: 'g1XE7nuhSqiJ9Xbb8GIv4w',
//     secret: 'rV98lhldS4y7HZykNk0UBQ',
//     masterSecret: '4kPmYtM5Ta206Y2YCdYmFg'
// };


//for qt bike trakl dev
var config = {
    key: 'X5diE07QRKCKvxwvIO9lCg',
    secret: 'DNls_9ffQ6yj8LxO5s1EEw',
    masterSecret: 'H6NsAzvZRt61VymecApXdg'
};



var urbanAirshipPush = new UrbanAirshipPush(config);

// var pushInfo = {
//     device_types: 'all',
//     audience: 'all',
//     notification: {
//         alert: 'Blubb blub bla'
//     }
// };


var dataNew;

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
            // Handle error
            return;
        }
        res.locals.ok = data.ok;
        console.log(data);
        console.log(data + res.locals.ok);
        console.log(data.ok);
        // return res.locals.ok;
        render(res.locals.ok);

    });
    // if (errors.length === 0) {
    //     sendEmail(message, function(success) {
    //         if (!success) {
    //             // locals.error = 'Error sending message';
    //             // locals.message = message;
    //         } else {
    //             // locals.notice = 'Your message has been sent.';
    //         }
    //         render();
    //     });
    // } else {
    //     // locals.error = 'Your message has errors:';
    //     // locals.errors = errors;
    //     // locals.message = message;
    //     render();
    // }
    console.log(res.locals.ok)




});