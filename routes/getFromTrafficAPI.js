var http=require('http');

//make the request object
var request=http.request({
  'host': 'http://trackl-traffic-api.azurewebsites.net',
  'port': 80,
  'path': '/journeys',
  'method': 'GET'
});

//assign callbacks
request.on('response', function(response) {
   console.log('Response status code:'+response.statusCode);

   response.on('data', function(data) {
     console.log('Body: '+data);
   });
});