define([
	'backbone'
], function () {
    AccordianView = Backbone.View.extend({
        constructor: function (options) {
            this.options = options || {};
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            _.bindAll(this, 'open', 'close', 'render', 'toggleView');
        },
        open: function () {

        },
        events: {
            'click li h1': 'toggleView'
        },
        toggleView: function (ev) {
            if (!(ev.target === ev.currentTarget))
                return;

            var isClose = false;

            if (this.$('.dtls:visible')[0] === $(ev.currentTarget).parent().find('.dtls')[0]) {
                isClose = true;
            }

            if (this.options.singleview) {
                this.$('.dtls:visible').slideToggle();
            }

            if (!isClose)
                $(ev.currentTarget).parent().find('.dtls').slideToggle();
        },
        render: function () {

        },
        close: function () {
            this.unbind();
            this.$el.unbind();
            this.$el.empty();
        },
        setText: function () {
        }
    });
    return AccordianView;
});