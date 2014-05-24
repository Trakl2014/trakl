define([
    'traklview',
	'text!templates/passwordreset.htm',
    'models/Model',
    'handlebars',
    'jqueryui',
    'pwdmeter'
], function (View, passwordresetTmpl, Model) {
    passwordResetView = View.extend({
        el: '#main',
        template: Handlebars.compile(passwordresetTmpl),
        resetId: "",
        initialize: function () {
            _.bindAll(this, 'open', 'close', 'render', 'save', 'restart', 'login', 'setPageLayout');
            var userId = "";
            var accountId = "";
            var userName = "";
        },
        open: function (resetId) {
            this.resetId = resetId
            this.model = new Model();
            this.model.urlRoot = "passwordreset";
            this.model.id = this.resetId;
            this.model.fetch({ success: this.render, error: this.unauthorized });
        },
        close: function () {
            this.$el.unbind();
            this.unbind();
            this.$el.empty();
        },
        events: {
            'click #saveBtn': 'save',
            'click #restartlink': 'restart',
            'click #loginlink': 'login'
        },
        render: function () {
            var that = this;
            $('.header').html('<div id="xj-logo"></div>');
            var jsonObject = this.model.toJSON();
            var data = {};

            if (jsonObject.USERPASSWORDRESET) {
                if (jsonObject.USERPASSWORDRESET.length > 0) {
                    data = $.extend(data, jsonObject.USERPASSWORDRESET[0])
                    that.$el.html(that.template(data));
                } else {
                    that.$el.html(that.template());
                    that.$el.find('#linkExpirydiv').css({ 'display': "block" });
                    that.$el.find('#pwdsuccessdiv').css({ 'display': "none" });
                    that.$el.find('#maindiv').css({ 'display': "none" });
                }
            }
            userId = data.USER_ID;
            accountId = data.ACCOUNT_ID;
            userName = data.USER_NAME;
            this.$el.find("#usernameval").text(userName);
            this.setPageLayout();
            this.$("#newPwd").pwdMeter({
                minLength: 6,
                displayGeneratePassword: true,
                generatePassText: l("%accountpassword.form.generate_password"),
                confirmpassword: that.$('#confirmPwd')
            });
            this.$el.find("#Spn_PasswordGenerator").css({
                'cursor': "pointer", 'text-decoration': "underline", 'float': "left",
                'margin-top': "-6%", 'font-size': '8pt'
            });
            this.$el.find("#Spn_NewPassword").css({ 'display': "none" });

            this.$("#showCb").css({'height': '20px', 'line-height': '20px', 'margin-bottom' : '3px'});
            this.$("#showCb").click(function () {
                if ($(this).is(':checked'))
                    that.$el.find("#newPwd").get(0).type = 'text';
                else
                    that.$el.find("#newPwd").get(0).type = 'password';
                that.$el.find("#newPwd").load(that.template());
            });
            this.$('#newPwd').keyup(function () {
                if (that.$('input[id="newPwd"]').val().length < 6)
                    that.$el.find("#pwdlen").css({ 'display': "block" });
                else
                    that.$el.find("#pwdlen").css({ 'display': "none" });
            });
            this.$('#confirmPwd').keyup(function () {
                if (that.$('input[id="newPwd"]').val() != that.$('input[id="confirmPwd"]').val())
                    that.$el.find("#pwdmatch").css({ 'display': "block" });
                else
                    that.$el.find("#pwdmatch").css({ 'display': "none" });
            });
        },
        save: function () {
            if ((this.$('input[id="newPwd"]').val().length != 0) && (this.$('input[id="confirmPwd"]').val().length != 0) && (this.$('input[id="newPwd"]').val().length >= 6) && (this.$('input[id="newPwd"]').val() == this.$('input[id="confirmPwd"]').val())) {
                var saveModel = new Model();
                saveModel.urlRoot = "passwordreset";
                saveModel.id = this.resetId;
                saveModel.set({ 'USER_ID': userId });
                saveModel.set({ 'ACCOUNT_ID': accountId });
                saveModel.set({ 'NEW_PASSWORD': this.$el.find('#confirmPwd').val() });
                var currentView = this;
                saveModel.save({}, {
                    success: function () {
                        currentView.$el.find('#linkExpirydiv').css({ 'display': "none" });
                        currentView.$el.find('#successlbl').text(l("%jobs.passwordreset.newpassword_savemsg1") + userName + ".");
                        currentView.$el.find('#pwdsuccessdiv').css({ 'display': "block" });
                        currentView.$el.find('#maindiv').css({ 'display': "none" });
                    },
                    error: function () {
                        alert(l("%common.xnappjobsview.error"));
                    }
                });
            } else {
                var msg = l("%accountpassword.form.save_error");
                if (this.$('input[id="newPwd"]').val().length == 0)
                    msg += "\n   -" + l("%accountpassword.form.newpassword_blank");
                if (this.$('input[id="confirmPwd"]').val().length == 0)
                    msg += "\n   -" + l("%accountpassword.form.confirmpassword_blank");
                if (this.$('input[id="newPwd"]').val().length < 6)
                    msg += "\n   -" + l("%accountpassword.form.newpassword_length");
                if (this.$('input[id="newPwd"]').val() != this.$('input[id="confirmPwd"]').val())
                    msg += "\n   -" + l("%accountpassword.form.newpassword_match");
                alert(msg);
            }
        },
        restart: function (e) {
            e.preventDefault();
            TraklApp.Router.navigate("forgotpassword", true);
        },
        login: function (e) {
            e.preventDefault();
            TraklApp.Router.navigate("login", true);
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
    return passwordResetView;
});