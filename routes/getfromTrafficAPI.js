exports.getJourneyList = function (callback) {
    var https = require('https');
    var xml2js = require('xml2js');
    var url = require('url');

    // request API data from trakl
    // http://trackl-traffic-api.azurewebsites.net/

    var TrafficOptions = {
        host: 'trackl-traffic-api.azurewebsites.net',
        path: '/journeys'
    };

    https.get(TrafficOptions, function (TrafficResponse) {
        var TrafficOptions = '';
        var trafficData = '';

        TrafficResponse.on('data', function (chunk) {
            // chunk response from Traffic
            trafficData += chunk;
            var message = "" + chunk;
            console.log('Received response of ' + message.length + ' bytes from Traffic.');
        });

        TrafficResponse.on('end', function () {
            // final response, now process data
            console.log('response end.');
            callback(trafficData);
        });

    });
};

exports.getJourney = function (ref, callback) {
    var TrafficOptions = {
        host: 'trackl-traffic-api.azurewebsites.net',
        path: '/journey?ref=' + ref
    };
    
    https.get(TrafficOptions, function (TrafficResponse) {
        var TrafficOptions = '';
        var trafficData = '';

        TrafficResponse.on('data', function (chunk) {
            // chunk response from Traffic
            trafficData += chunk;
            var message = "" + chunk;
            console.log('Received response of ' + message.length + ' bytes from Traffic.');
        });

        TrafficResponse.on('end', function () {
            // final response, now process data
            console.log('response end.');
            callback(trafficData);
        });

    });
}