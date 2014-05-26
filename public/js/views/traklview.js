define([
	'backbone',
    'l10n',
    'localizations'
], function () {
    Traklview = Backbone.View.extend({
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
            alert(l("Error"));
        }
    });
    return Traklview;
});