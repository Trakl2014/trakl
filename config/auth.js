// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': '230446117153579', // your App ID
        'clientSecret': 'a5610f38c6a8dd6faebe1acb04c17caf', // your App Secret
        'callbackURL': '/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': 'qxYxRaaAHPMBZqJwlmluWfyxc',
        'consumerSecret': 'pYQBVuX1gh7e4z5psq5ZmEpIX6Eq0RJIOvYkNgZNCjtHvVYGFr',
        'callbackURL': '/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    }

};