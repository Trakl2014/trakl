var express = require('express');
var router = express.Router();

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

module.exports = router;
