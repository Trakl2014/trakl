define([
	'traklview',
	'text!templates/login.htm',
    'models/Model',
    'jqueryvalidate',
    'handlebars',
    'l10n',
    'localizations',
], function (View, HomeTemplate, Model) {

      HomeView = View.extend({
        el: $("#main"),
        initialize: function () {
            _.bindAll(this, 'open', 'render');
        },
        events: {
            
        },
        model: new Model,
        template: Handlebars.compile(HomeTemplate),
        render: function () {

            
        },
        open: function () {
            this.render();
        },
        close: function () {
            this.$el.empty();
            this.unbind();
        },
        // set width and height of page layout
        /*setPageLayout: function () {
            var strBodyHeight = $(window).height() - ($('#header').height() + $('.footer').height() + 8);
            var strBodyWidth = $(window).width();

            var loginH = this.$('.login-box').height();
            var loginW = this.$('.login-box').width();

            var loginSetTop = ((strBodyHeight - loginH) / 2);

            var loginSetLeft = ((strBodyWidth - loginW) / 2);

            this.$('.login-box').css({ 'margin-top': +loginSetTop + 'px' });
            //this.$('#login-box-shadow').css({ 'margin-top': +loginSetTop + 'px' });

            this.$('.login-box').css({ 'margin-left': +loginSetLeft + 'px' });
            this.$('#login-box-shadow').css({ 'margin-left': +loginSetLeft + 'px' });

            this.$('.login-button').bind({
                'mouseover': function () {
                    $('.login-button').css('cursor', 'pointer');
                }
            });

        }*/

    });

    return LoginView;
});
