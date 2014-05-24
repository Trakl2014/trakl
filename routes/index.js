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

router.get('/journeylist', function(req, res) {
	var journeyList = require('./getfromTrafficAPI.js');
	res.render('journeylist', {
		data: journeyList.getJourneyList('', function(data))
	});
});



module.exports = router;