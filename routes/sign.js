var express = require('express');
var router = express.Router();

/* GET signup_buyer. */
router.get('/', function(req, res, next) {
  res.render('sign');
});

/* POST signup_buyer. */
router.post('/', function(req, res, next) {
  res.render('sign', {email: req.body.email, name: req.body.name});
});

module.exports = router;
