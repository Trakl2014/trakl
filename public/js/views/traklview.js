define([
	'backbone',
    'l10n',
    'localizations'
], function () {
    traklview = Backbone.View.extend({
        constructor: function(options) {
            this.options = options || {};
            Backbone.View.apply(this, arguments);
        },
        open: function () {
        },
        close: function () {
        }
        ,
        setText: function () {
        }
        ,
        unauthorized: function (xhr, st, err) {
            if (xhr.responseText == "NO PERMISSION") {
                alert(l("%common.traklview.permission_error"));
            } else if (xhr.responseText == "INVALID TOKEN") {
                alert(l("%common.traklview.invalid_token_error"));
                XnappJobsApp.Router.navigate("logout", true);
            } else {
                alert(l("%common.traklview.error"));
            }
        }
    });
    return traklview;
});