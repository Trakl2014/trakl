var router = require('express').Router();
var UrbanAirshipPush = require('urban-airship-push');
var journeyData = require('../services/journey-data');

/*
 * GET home page.
 */

router.get('/', function(req, res) {
    res.render('index', {
        title: 'The begining of of hackakl project'
    });
});


/*
 * GET submitted page.
 */

router.get('/submitted', function(req, res) {
    res.render('submitted', {
        title: res.locals.message
    });
});


/*
 * POST home page.
 */

router.post('/', function(req, res) {

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

    var urbanAirshipPush = new UrbanAirshipPush(config);

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

    console.log(res.locals.ok);

});

module.exports = router;
