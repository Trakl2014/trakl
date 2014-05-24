define([
	'traklview',
	'text!templates/login.htm',
    'models/Model',
    'jqueryvalidate',
    'handlebars',
    'l10n',
    'localizations',
    ], function (View, LoginTemplate, Model, ForgotPasswordView) {

        LoginView = View.extend({
            el: $("#main"),
            initialize: function () {
                _.bindAll(this, 'open', 'loginclick', 'forgotPasswordClick', 'loginerror');
            },
            events: {
                'click #login-button': 'loginclick',
                'submit form': 'loginclick',
                'click .text-box': 'hideAlert',
                'click  #lnkForgotPassword': 'forgotPasswordClick'
            },
            model: new Model,
            template: Handlebars.compile(LoginTemplate),
            render: function () {

                $('.header').html('<div class="logo"></div>');

                document.title = l("Login");

                this.$el.html(this.template());

                this.setPageLayout();

                var that = this;
                $(document).keypress(function (event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13') {
                        that.$('#login-button').trigger('click');
                    }
                });
            },
            open: function () {
                this.render();
            },
            close: function () {
                $(this.el).html("");
                this.unbind();
            },
            loginclick: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($('form').validate() != null) {
                    if (!$('form').validate().form()) {
                        return;
                    }
                }
                this.$el.find('.alert').fadeOut();

                var username = $(this.el).find('#username').val();
                var password = $(this.el).find('#password').val();

                TraklApp.State.set({ "tokenid": password });

                var login = new Model();
                login.urlRoot = 'userlogin';

                login.set({id : username});
                login.fetch({
                    "success": function () {
                        if ($.cookie("tokenid") == null) {
                            $.cookie("tokenid", login.get("auth"), { expires: 1 });
                            $.cookie("username", username, { expires: 1 });
                        }
                        TraklApp.State.set({ "tokenid": login.get("auth"), "username": username, 'preference': login, 'clientType': login.get("clientType") });
                        TraklApp.Router.navigate("locate", true);
                    },
                    "error": this.loginerror
                });
            },
            loginerror: function (a, b, c) {
                this.$el.find('.alert').fadeIn();
                this.$el.find('#password').focus();
            },
            hideAlert: function () {
                $('.alert').fadeOut();
            },
            forgotPasswordClick: function (e) {
                e.preventDefault();
                TraklApp.Router.navigate("forgotpassword", true);
            },
            // set width and height of page layout
            setPageLayout: function () {
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

            }

        });

        return LoginView;
    });
