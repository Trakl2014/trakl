/**
@name jQuery pwdMeter 1.0.1
@author Shouvik Chatterjee (mailme@shouvik.net)
@date 31 Oct 2010
@modify 31 Dec 2010
@license Free for personal and commercial use as long as the author's name retains
*/
(function (jQuery) {

    jQuery.fn.pwdMeter = function (options) {


        options = jQuery.extend({

            minLength: 6,
            displayGeneratePassword: false,
            generatePassText: 'Password Generator',
            generatePassClass: 'GeneratePasswordLink',
            randomPassLength: 13,
            passwordBox: this,
            confirmpassword: null,
            pwdmeter: '#pwdMeter',
            id: ""
        }, options);


        return this.each(function (index) {

            $(this).keyup(function () {
                evaluateMeter();
            });


            function evaluateMeter() {

                var passwordStrength = 0;
                var password = $(options.passwordBox).val();

                if ((password.length > 0) && (password.length <= 5)) passwordStrength = 1;

                if (password.length >= options.minLength) passwordStrength++;

                if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) passwordStrength++;

                if (password.match(/\d+/)) passwordStrength++;

                if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) passwordStrength++;

                if (password.length > 12) passwordStrength++;

                $(options.pwdmeter).removeClass();
                $(options.pwdmeter).addClass('neutral');

                switch (passwordStrength) {
                    case 1:
                        $(options.pwdmeter).addClass('veryweak');
                        $(options.pwdmeter).text(l("%password.strength.very_weak"));
                        break;
                    case 2:
                        $(options.pwdmeter).addClass('weak');
                        $(options.pwdmeter).text(l("%password.strength.weak"));
                        break;
                    case 3:
                        $(options.pwdmeter).addClass('medium');
                        $(options.pwdmeter).text(l("%password.strength.medium"));
                        break;
                    case 4:
                        $(options.pwdmeter).addClass('strong');
                        $(options.pwdmeter).text(l("%password.strength.strong"));
                        break;
                    case 5:
                        $(options.pwdmeter).addClass('verystrong');
                        $(options.pwdmeter).text(l(l("%password.strength.very_strong")));
                        break;
                    default:
                        $(options.pwdmeter).addClass('neutral');
                        $(options.pwdmeter).text(l("%password.strength.very_weak"));
                }

            }


            if (options.displayGeneratePassword) {
                $(options.pwdmeter).after('&nbsp;<span id="Spn_PasswordGenerator' + options.id + '" class="' + options.generatePassClass + '">' + options.generatePassText + '</span>&nbsp;<span id="Spn_NewPassword' + options.id + '" class="NewPassword"></span>');
            }

            $('#Spn_PasswordGenerator' + options.id).click(function () {
                var randomPassword = random_password();
                $('#Spn_NewPassword' + options.id).text(randomPassword);
                $(options.passwordBox).val(randomPassword);
                $(options.confirmpassword).val(randomPassword);
                evaluateMeter();
            });


            function random_password() {
                var allowed_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!?$?%^&*()_-+={[}]:;@~#|\<,>.?/";
                var pwd_length = options.randomPassLength;
                var rnd_pwd = '';
                for (var i = 0; i < pwd_length; i++) {
                    var rnd_num = Math.floor(Math.random() * allowed_chars.length);
                    rnd_pwd += allowed_chars.substring(rnd_num, rnd_num + 1);
                }
                return rnd_pwd;
            }

        });

    }

})(jQuery)
