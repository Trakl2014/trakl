define([

], function () {
    Date.prototype.yyyymmdd = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
    };
    Date.prototype.sqlDateFormat = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        var date = (dd[1] ? dd : "0" + dd[0]) + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + yyyy; // padding

        var hh = this.getHours().toString();
        var MM = this.getMinutes().toString();
        var ss = this.getSeconds().toString();
        var time = (hh[1] ? hh : "0" + hh[0]) + ":" + (MM[1] ? MM : "0" + MM[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);

        return date + " " + time;
    };
    Date.prototype.toISOString = function () {
        function pad(n) { return n < 10 ? '0' + n : n }
        return this.getUTCFullYear() + '-'
        + pad(this.getUTCMonth() + 1) + '-'
        + pad(this.getUTCDate()) + 'T'
        + pad(this.getUTCHours()) + ':'
        + pad(this.getUTCMinutes()) + ':'
        + pad(this.getUTCSeconds()) + 'Z';
    };

    Date.parseSQLDate = function (st) {
        if (st) {
            var dregex = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
            var dateArray = dregex.exec(st);
            return new Date(
                (dateArray[3]),
                (dateArray[2]) - 1,
                (dateArray[1]),
                (dateArray[4]),
                (dateArray[5]),
                (dateArray[6])
            );
        }
    };
});