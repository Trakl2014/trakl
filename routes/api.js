var router = require('express').Router();
var traffic = require('../services/journey-data');
var TravelTime = require('../models/travel-time');
var journeyData = require('../services/journey-data');
var User = require('../models/user');

router.post('/createuser', function(req, res) {
    var userInfo = JSON.stringify(req.body);
    var userName = JSON.stringify(req.body.name)
    res.send('create user ' + userInfo);
    console.log('recieved user ' + userName);
    // var newUser = new User(req.body);
    // newUser.save(function(err) {
    //     if (err) // ...
    //         console.log('meow');
    // }); 
    User.findOneAndUpdate({
            id: req.body.id
        },
        req.body, {
            upsert: true
        }).exec(function(err, User) {
        console.dir(User);
    });
})


/*
 * Private methods
 */

var saveTravelTime = function(travelTime, res) {

    travelTime.save(function(err) {

        if (err) {
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
    console.log(userId);
    TravelTime.findOne({
        userId: userId
    }, function(err, result) {
        if (err) {
            res.statusCode = 500;
            return res.send(err);
        }
        //try catch added for if a bad userid is sent
        try {

            if (!result.travelMinutes) {

                traffic.getJourneyTraffic(result.journeyRef, function(trafficData) {
                    if (trafficData.substr(0, 28) !== 'The page cannot be displayed') {
                        var response = result;
                        var trafficDetails = JSON.parse(trafficData);
                        var isImproving = trafficDetails.minutes < trafficDetails.lastMinutes;
                        response.travelMinutes = trafficDetails.minutes;
                        response.isImproving = isImproving;
                        res.json(response);
                    } else {
                        console.log('No traffic data returned for ref: ' + result.journeyRef);
                    }
                });

            } else {
                res.json(result);
                console.log('Travel min: ' + result.travelMinutes);
                console.log('User id: ' + result.userId);
            }
        } catch (e) {
            console.log(e);
        }
    });

});


/*
 * POST new user journey
 */

router.post('/travel-time', function(req, res) {

    // TODO: Refactor this out into its own module
    // console.log(req);
    var travelTime = new TravelTime();

    // Try to get from query/form parameters
    var userId = req.param('userId');
    var journeyRef = req.param('journeyRef');

    if (!userId) { // Extract from json body
        userId = req.body.userId;
        journeyRef = req.body.journeyRef;
    }

    //console.log('userId: ' + userId);
    //console.log('journeyRef: ' + journeyRef);
    //console.log('body: ' + JSON.stringify(req.body));

    // Ensure existing user is removed before saving to prevent duplicates
    TravelTime.findOneAndRemove({
        userId: userId
    }, function(err) {
        if (err) {
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