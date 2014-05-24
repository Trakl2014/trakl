var express = require('express');
var router = express.Router();
var mongo = require('mongoose');

router.get('/test', function(req, res) {
  res.json({
    test: 'this is a test'
  });
});

module.exports = router;
