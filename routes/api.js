var router = require('express').Router();
var TravelTime = require('../models/travel-time');
var journeyData = require('../services/journey-data');

/*
 * Private methods
 */

var saveTravelTime = function(travelTime, res) {

    travelTime.save(function(err) {

        if(err) {
            res.statusCode = 500;
            return res.send(err);
        }

        res.json({
            message: 'travel time saved'
        });

    });

};


/*
 * GET user journey
 */

router.get('/travel-time', function(req, res) {

    var userId = req.param('userId');

    TravelTime.findOne({userId: userId}, function(err, result) {
        if(err) {
            res.statusCode = 500;
            return res.send(err);
        }
        res.json(result);
    });

});


/*
 * POST new user journey
 */

router.post('/travel-time', function(req, res) {

    // TODO: Refactor this out into its own module

    var travelTime = new TravelTime();

    // Try to get from query/form parameters
    var userId = req.param('userId');
    var journeyRef = req.param('journeyRef');

    if(!userId) { // Extract from json body
        userId = req.body.userId;
        journeyRef = req.body.journeyRef;
    }

    //console.log('userId: ' + userId);
    //console.log('journeyRef: ' + journeyRef);
    //console.log('body: ' + JSON.stringify(req.body));

    // Ensure existing user is removed before saving to prevent duplicates
    TravelTime.findOneAndRemove({userId: userId}, function(err) {
        if(err) {
            res.statusCode = 500;
            return res.send(err);
        }

        travelTime.userId = userId;
        travelTime.journeyRef = journeyRef;
        saveTravelTime(travelTime, res);
    });

});


/*
 * GET journey list
 */

router.get('/journeys', function(req, res) {

    console.log('Calling Traffic API ...');

    journeyData.getJourneyList(function(response) {
        console.log('Got response from traffic api');
        res.json(response);
    });

});

module.exports = router;
