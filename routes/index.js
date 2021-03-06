var router = require('express').Router();
var journeyData = require('../services/journey-data');
var notification = require('../services/notification.js');




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

    var message = req.body.message;
    res.locals.message = message;

    function render(isOk) {
        // res.render('index', locals);
        res.render('submitted', {
            title: message,
            opID: isOk
        });
    } 

    notification.notify(message, function(ok) {
        res.locals.ok = ok;
        console.log('Notification callback: ' + ok);
        render(ok);
    });

});



module.exports = router;