var express = require('express');
var router = express.Router();

/* GET buyerLogin. */
router.get('/', function(req, res, next) {
  res.render('Login', {login_fail: false});
});

module.exports = router;
