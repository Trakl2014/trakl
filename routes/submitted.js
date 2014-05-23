exports.submit = function(req, res) {
    res.render('submitted', {
        title: res.locals.message
        // title: 'submitted router'
    });
};