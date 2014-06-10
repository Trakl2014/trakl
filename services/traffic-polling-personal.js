var intervalHandle = null;
var traffic = require('./journey-data');
var TravelTime = require('../models/travel-time');
var notification = require('../services/notification.js');
var util = require('util');

var TWO_MINUTES = 1000 * 60 * 2;
var FIVE_MINUTES = 1000 * 60 * 5;
var TEN_MINUTES = 1000 * 60 * 10;
var messageTemplate = 'Hi NNNN, this is Esther. Your trip home will take XXXX minutes, and conditions are getting YYYY.';

/*
 * Private methods
 */

var saveTrafficPersonal = function(userId, trafficDetails) {

    var trafficStatus = {
        travelMinutes: trafficDetails.minutes,
        isImproving: trafficDetails.minutes < trafficDetails.lastMinutes
    };

    var query = {
        userId: userId
    };
    User.update(query, trafficStatus, function(err) {
        if (err) {
            console.log('Error: ' + err.message);
        } else {
            console.log('Travel time updated for userId: ' + userId);
        }
    });

};

var updateTrafficDataPersonal = function(journeys) {

    var message = '';
    var journey = {};

    for (var i = 0; i < journeys.length; i++) {

        journey = journeys[i];

        traffic.getJourneyTraffic(journey.journeyRef, function(trafficData) {
            try {
                var trafficDetails = JSON.parse(trafficData);
                var isImproving = trafficDetails.minutes < trafficDetails.lastMinutes;
                var isBetter = isImproving ? 'better' : 'worse';
                message = messageTemplate.replace('NNNN', trafficDetails.name);
                message = messageTemplate.replace('XXXX', trafficDetails.minutes);
                message = message.replace('YYYY', isBetter);
                console.log('Message: ' + message);
                notification.notify(message);
                saveTraffic(journey.userId, trafficDetails);
            } catch (e) {
                console.info(e); //error in the above string(in this case,yes)!
                console.log('No traffic data returned for ref: ' + journey.journeyRef);
            }


        });

    }

};



var activatePollingPersonal = function(storedJourneys) {

    // Update immediatesly
    updateTrafficData(storedJourneys);

    // Update every 5 minutes
    setInterval(function() {
        updateTrafficData(storedJourneys);
    }, TEN_MINUTES);

};


/*
 * Public exported object
 */

var trafficPollingPersonal = {

    startPollingPersonal: function() {

        var journeys;
        User.find({}, function(err, storedJourneys) {
            if (!err && storedJourneys) {
                activatePolling(storedJourneys);
            }
        });

    },

    stopPollingPersonal: function() {
        clearInterval(intervalHandle);
    }

};

module.exports = trafficPollingPersonal;