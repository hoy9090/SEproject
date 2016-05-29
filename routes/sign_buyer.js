var express = require('express');
var router = express.Router();

/* GET signup_buyer. */
router.get('/', function(req, res, next) {
  res.render('sign_buyer');
});

/* POST signup_buyer. */
router.post('/', function(req, res, next) {
  res.render('sign_buyer', {email: req.body.email, name: req.body.name});
});

module.exports = router;
