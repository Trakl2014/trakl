define([
	'backbone'
], function () {
    MenuView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'open', 'close', 'render', 'menuclick');
        },
        events: {
            'click li.click': 'menuclick'
        },
        menuclick: function (ev) {
            this.trigger('menuclick', $(ev.currentTarget));
        },
        open: function () {

        },
        render: function () {

        },
        close: function () {
            this.unbind();
            this.$el.unbind();
            this.$el.empty();
        }
    });
    return MenuView;
});