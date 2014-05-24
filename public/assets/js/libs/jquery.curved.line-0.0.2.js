/* 
 
	Simple jQuery Curved Line Plugin for use with Google Maps Api 
	
	author: Daniel Nanovski
	modifications: Coen de Jong
	version: 0.0.2 (Beta)
	website: http://curved_lines.overfx.net/
	
	License:
	Copyright (c) 2012 Daniel Nanovski, http://overfx.net/

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
*/
(function ($) {


    $.fn.extend({

        curvedLine: function (options) {

            this.defaults = {
                LatStart: null,
                LngStart: null,
                LatEnd: null,
                LngEnd: null,
                Color: "#6599FF",
                Opacity: 0.5,
                Weight: 6,
                GapWidth: 0,
                Horizontal: true,
                Multiplier: 1,
                Resolution: 0.1,
                Map: null
            }

            this.evenOdd = 0;
            this.curvedLineLayer = null;
            this.options = $.extend(this.defaults, options);

            this.curvedLineCreateSegment = function (LatStart, LngStart, LatEnd, LngEnd, Color, Opacity, Weight, GapWidth, Map) {

                this.evenOdd++;

                if (this.evenOdd % (GapWidth + 1))
                    return;

                var LineCordinates = new Array();

                LineCordinates[0] = new google.maps.LatLng(LatStart, LngStart);
                LineCordinates[1] = new google.maps.LatLng(LatEnd, LngEnd);

                var Line = new google.maps.Polyline({
                    path: LineCordinates,
                    geodesic: false,
                    strokeColor: Color,
                    strokeOpacity: Opacity,
                    strokeWeight: Weight
                });

                Line.setMap(Map);
                this.curvedLineLayer.addOverlay(Line);


            }
            this.removeLines = function () {
                if (this.curvedLineLayer)
                    this.curvedLineLayer.clearOverlays();
                this.curvedLineLayer = null;
            }

            this.draw = function () {
                var o = this.options;

                var LastLat = o.LatStart;
                var LastLng = o.LngStart;

                var PartLat;
                var PartLng;

                var Points = new Array();
                var PointsOffset = new Array();

                for (point = 0; point <= 1; point += o.Resolution) {
                    Points.push(point);
                    offset = (0.6 * Math.sin((Math.PI * point / 1)));
                    PointsOffset.push(offset);
                }

                var OffsetMultiplier = 0;

                if (o.Horizontal == true) {

                    var OffsetLenght = (o.LngEnd - o.LngStart) * 0.1;

                } else {

                    var OffsetLenght = (o.LatEnd - o.LatStart) * 0.1;

                }

                this.curvedLineLayer = new vxgoogleLayer(o.Map, 'curvedLineLayer');

                for (var i = 0; i < Points.length; i++) {

                    if (i == 4) {

                        OffsetMultiplier = 1.5 * o.Multiplier;

                    }

                    if (i >= 5) {

                        OffsetMultiplier = (OffsetLenght * PointsOffset[i]) * o.Multiplier;

                    } else {

                        OffsetMultiplier = (OffsetLenght * PointsOffset[i]) * o.Multiplier;

                    }

                    if (o.Horizontal == true) {

                        PartLat = (o.LatStart + ((o.LatEnd - o.LatStart) * Points[i])) + OffsetMultiplier;
                        PartLng = (o.LngStart + ((o.LngEnd - o.LngStart) * Points[i]));

                    } else {

                        PartLat = (o.LatStart + ((o.LatEnd - o.LatStart) * Points[i]));
                        PartLng = (o.LngStart + ((o.LngEnd - o.LngStart) * Points[i])) + OffsetMultiplier;

                    }

                    this.curvedLineCreateSegment(LastLat, LastLng, PartLat, PartLng, o.Color, o.Opacity, o.Weight, o.GapWidth, o.Map);

                    LastLat = PartLat;
                    LastLng = PartLng;

                }

                this.curvedLineCreateSegment(LastLat, LastLng, o.LatEnd, o.LngEnd, o.Color, o.Opacity, o.Weight, o.GapWidth, o.Map);

                return this;
            }

            return this.draw();

        }


    });

})(jQuery);