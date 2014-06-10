var router = require('express').Router();
var journeyData = require('../services/journey-data');
var notification = require('../services/notification.js');

// normal routes ===============================================================

// show the home page (will also have our login links)
router.get('/', function(req, res) {
    res.render('index.ejs');
});

// PROFILE SECTION =========================
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user: req.user
    });
});

// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
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

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = router;