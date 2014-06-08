var router = require('express').Router();
var User = require('../models/user');


router.post('/createuser', function(req, res) {
    var user = JSON.stringify(req.body);
    res.send('create user ' + user);
    // console.log(req.body);

    var promise = User.create(user);
    promise.then(function() {
        console.log(user)
    })
})

module.exports = router;