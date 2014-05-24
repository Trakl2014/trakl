var url = require('url');
var https = require('https');
var xml2js = require('xml2js');

/*
 * Public exported object
 */

var journeyData = {

  getJourneyList:  function (callback) {
      // request API data from trakl
      // http://trackl-traffic-api.azurewebsites.net/

      var trafficOptions = {
          host: 'trackl-traffic-api.azurewebsites.net',
          path: '/journeys'
      };

      https.get(trafficOptions, function (trafficResponse) {

          var trafficData = '';

          trafficResponse.on('data', function (chunk) {
              // chunk response from Traffic
              trafficData += chunk;
              var message = "" + chunk;
              console.log('Received response of ' + message.length + ' bytes from Traffic.');
          });

          trafficResponse.on('end', function () {
              // final response, now process data
              console.log('response end.');
              callback(trafficData);
          });

      });
  },

  getJourneyTraffic: function (journeyRef, callback) {

      var trafficOptions = {
          host: 'trackl-traffic-api.azurewebsites.net',
          path: '/journey?ref=' + journeyRef
      };

      https.get(trafficOptions, function (trafficResponse) {

          var trafficData = '';

          trafficResponse.on('data', function (chunk) {
              // chunk response from Traffic
              trafficData += chunk;
              var message = "" + chunk;
              console.log('Received response of ' + message.length + ' bytes from Traffic.');
          });

          trafficResponse.on('end', function () {
              // final response, now process data
              console.log('response end.');
              callback(trafficData);
          });

      });
  }

};

module.exports = journeyData;
