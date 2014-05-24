define([
    'jquery'
], function () {
    Security = function () {
        this.permission = null;

        this.setscreen = function (ScreenName) {
            var that = this;

            $.ajax({
                async: false,
                url: 'security',
                data: "ScreenName=" + ScreenName,
                dataType: 'json',
                "success": function (data) {
                    that.permission = data.ROLEPERMISSION;

                }
            })
        }

        this.hasPermission = function (PermissionName) {
            var isValid = false;

            $.each(this.permission, function (idx, permission) {
                if (permission.PERMISSIONNAME == PermissionName) {
                    isValid = true;
                    return false;
                }
            });

            return isValid;
        }
    }
    return Security;
});