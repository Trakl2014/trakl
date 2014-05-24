define([
	'traklview',
    'text!templates/header.htm',
    'models/Model',
	'underscore',
	'handlebars',
    'l10n',
    'localizations',
    'datefunctions'
], function (view, template, Model) {
    //View for the header
    HeaderView = view.extend({
        el: $("#header"),
        template: Handlebars.compile(template),
        initialize: function () {
            _.bindAll(this, 'open', 'close', 'render');
           
        },
        events:
        {
            'click .menu-button': 'menuclick'
        },
        logout: function (e) {
            TraklApp.Router.navigate("logout", true);
        },
        render: function () {
            this.$el.html(this.template());
        },
        menuclick: function (li) {
            var route = li.attr("data-route");

            if (route)
                TraklApp.Router.navigate(route, true);
        },
        open: function () {
            this.render();
        },
        close: function () {
            this.$el.unbind();
            this.$el.empty();
            this.unbind();
        },
    });

    return HeaderView;
});