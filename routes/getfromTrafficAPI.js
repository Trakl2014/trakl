exports.getJourneyList = function (reqUrl, callback) {
    var https = require('https');
    var xml2js = require('xml2js');
    var url = require('url');

    // request API data from trakl
    // http://trackl-traffic-api.azurewebsites.net/

    var TrafficOptions = {
        host: 'trackl-traffic-api.azurewebsites.net',
        port: 1337,
        path: '/journeys'
    };

    https.get(TrafficOptions, function (TrafficResponse) {
        var TrafficOptions = '';

        TrafficResponse.on('data', function (chunk) {
            // chunk response from Traffic
            TrafficData += chunk;
            var message = "" + chunk;
            console.log('Received response of ' + message.length + ' bytes from Traffic.');
        });

        TrafficResponse.on('end', function () {
            // final response, now process data
            console.log('response end.');
            callback(TrafficData);
     

        });

    });
};