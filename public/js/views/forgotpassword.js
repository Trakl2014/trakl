define([
	'traklview',
	'text!templates/forgotpassword.htm',
    'models/Model',
    'handlebars',
    'jqueryui'
], function (View, ForgotPasswordTemplate, Model) {
    ForgotPasswordView = View.extend({
        el: '#main',
        template: Handlebars.compile(ForgotPasswordTemplate),
        initialize: function () {
            _.bindAll(this, 'open', 'close', 'setPageLayout', 'render', 'btnOkClick');
            //TraklApp.appendJobFormatCss();
        },
        events: {
            'click #okBtn': 'btnOkClick'
        },
        render: function () {
            $('.header').html('<div id="xj-logo"></div>');
            this.$el.html(this.template());
            this.setPageLayout();
        },
        open: function () {
            this.render();
        },
        close: function () {
            this.$el.unbind();
            this.unbind();
            this.$el.empty();
        },
        btnOkClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var pwdModel = new Model();
            pwdModel.urlRoot = "forgotpassword";
            pwdModel.set({ 'USER': this.$el.find("#user").val() });

            var currentView = this;
            pwdModel.save({}, {
                success: function () {
                    currentView.$el.find('#userdiv').hide();
                    currentView.$el.find('#oklbldiv').hide();
                    currentView.$el.find('#emailsntdiv').show();
                },
                error: function (model, response) {
                    var errmessage = response.responseText;
                    if (errmessage == "Invaliduser")
                        errmessage = l("%jobs.forgotpassword.invaliduser_errormessage");
                    alert(errmessage);
                }
            });
        },
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

    return ForgotPasswordView;
});
