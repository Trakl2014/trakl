var express = require('express');
var router = express.Router();
var mongo = require('mongoose');
var TravelTime = require('../models/travel-time');

router.post('/travel-time', function(req, res) {

  // TODO: Refactor this out into its own module

  var travelTime = new TravelTime();
  var userId = req.param('userId');
  var journeyRef = req.param('journeyRef');

  if(!userId) { // get params from json in body
    userId = req.body.userId;
    journeyRef = req.body.journeyRef;
  }

  console.log('body: ' + JSON.stringify(req.body));
  console.log('userId: ' + userId);
  console.log('journeyRef: ' + journeyRef);

  travelTime.userId = userId;
  travelTime.journeyRef = journeyRef;

  travelTime.save(function(err) {

      if(err) {
        res.send(err);
        return;
      }

      res.json({
        message: 'travel time saved'
      });

  });

});

module.exports = router;
