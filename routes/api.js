var express = require('express');
var router = express.Router();
var mongo = require('mongoose');
var TravelTime = require('../models/travel-time');

router.post('/travel-time', function(req, res) {

  // TODO: Refactor this out into its own module

  var travelTime = new TravelTime();
  var userId = req.param('userId');
  var journeyRef = req.param('journeyRef');

  // console.log('userId: ' + userId);
  // console.log('journeyRef: ' + journeyRef);

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
