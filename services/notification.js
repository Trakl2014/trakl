var UrbanAirshipPush = require('urban-airship-push');

var notifier = {

    notify: function(message, callback) {

        var pushInfo = {
            audience: 'all',
            device_types: 'all',
            notification: { alert: message }
        };

        /*
        // For qt bike fest dev (existing app)
        var config = {
            key: 'g1XE7nuhSqiJ9Xbb8GIv4w',
            secret: 'rV98lhldS4y7HZykNk0UBQ',
            masterSecret: '4kPmYtM5Ta206Y2YCdYmFg'
        };
        */

        // For TrAkl notifications
        var config = {
            key: 'X5diE07QRKCKvxwvIO9lCg',
            secret: 'DNls_9ffQ6yj8LxO5s1EEw',
            masterSecret: 'H6NsAzvZRt61VymecApXdg'
        };

        var urbanAirshipPush = new UrbanAirshipPush(config);

        urbanAirshipPush.push.send(pushInfo, function(err, data) {

            if (err) {
                // TODO: Handle error
                return;
            }

            callback && callback(data.ok);
            console.log('OK? ' + data.ok);

        });

    }

};

module.exports = notifier;
