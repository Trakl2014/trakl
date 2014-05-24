function vxgoogleLayer(mapobj, layername) {
    this.mapobj = mapobj;
    this.layername = layername;

    this.objarr = new Array();

    this.addOverlay = function(overlay) {
        this.objarr.push(overlay);
        overlay.setMap(this.mapobj);
    }

    this.getMarkers = function () {
        return this.objarr;
    }

    this.clearOverlays = function() {
        while (this.objarr.length > 0) {
            var overlay = this.objarr.pop();

            overlay.setMap(null);

            overlay = null;
        }
    }

    this.zoomTo = function() {
        if (this.objarr.length > 0) {
            var gb = new google.maps.LatLngBounds();

            for (var x in this.objarr) {
                gb.extend(this.objarr[x].getPosition());
            }

            this.mapobj.fitBounds(gb);

            var zoom = this.mapobj.getZoom();
            this.mapobj.setZoom(zoom < 18 ? 18 : zoom);
        }
    }

    this.getBounds = function(){
         if (this.objarr.length > 0) {
            var gb = new google.maps.LatLngBounds();

            for (var x in this.objarr) {
                gb.extend(this.objarr[x].getPosition());
            }

            return gb;
        }
    }

}