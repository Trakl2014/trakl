// convert Google Maps into an AMD module
define(['app', 'async!//maps.google.com/maps/api/js?v=3&sensor=false'], function (app) {
    app.service('MapService', function () {
        var gmaps =  window.google.maps,
            mapOptions = {
                zoom: 5,
                draggable: true,
                mapTypeId: gmaps.MapTypeId.ROADMAP,
                panControl: true,
                disableDoubleClickZoom: true,
                disableDefaultUI: true,
                zoomControl: true,
                scaleControl: true,
            },
            latLng;

        /**
         * Create map with initial position given by scope.latitude and scope.longitude.
         * Default to LatLng of Auckland in New Zealand
         */
        this.initialize = function (scope, elementName) {
            var lat = scope.latitude || this.getLatLng().lat(),
                lng = scope.longitude || this.getLatLng().lng();

            this.map = new gmaps.Map(document.getElementById(elementName), mapOptions);
            
            // Set initial position
            if (!latLng) {
                latLng = new gmaps.LatLng(lat, lng);
            } else {
                scope.latitude = latLng.lat();
                scope.longitude = latLng.lng();
            }
            this.map.setCenter(latLng);

            
            this.gDir = new gmaps.DirectionsService();
            this.directionsDisplay = new gmaps.DirectionsRenderer();
            this.directionsDisplay.setMap(this.map);
            var trafficLayer = new gmaps.TrafficLayer();
            trafficLayer.setMap(this.map);
        };

        this.showDirections = function (journey) {
            var that = this;
            var startLat = parseFloat(journey.startLat);
            var startLong = parseFloat(journey.startLong);
            var endLat = parseFloat(journey.endLat);
            var endLong = parseFloat(journey.endLong);

            this.directionsDisplay.setMap(null);
            this.directionsDisplay = new google.maps.DirectionsRenderer();
            this.directionsDisplay.setMap(this.map);

            var request = {
                origin: new google.maps.LatLng(startLat, startLong),
                destination: new google.maps.LatLng(endLat, endLong),
                travelMode: google.maps.TravelMode.DRIVING
            };

            this.gDir.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    that.directionsDisplay.setDirections(result);
                    that.map.fitBounds(result.routes[0].bounds);
                }
            });
        };

        this.resize = function () {
            gmaps.event.trigger(this.map, 'resize');
        };

        this.getLatLng = function () {
            if (google.loader && google.loader.ClientLocation != null) {
                return new gmaps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
            }
            return new gmaps.LatLng(-36.836218, 174.762955);
        }
            
    });
});
// REF: http://blog.millermedeiros.com/requirejs-2-0-delayed-module-evaluation-and-google-maps/