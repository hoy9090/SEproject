var express = require('express');
var router = express.Router();

/* GET signup_buyer page. */
router.get('/', function(req, res, next) {
  res.render('sign_buyer');
});

module.exports = router;
