var express = require('express');
var router = express.Router();

/* GET buyerLogin. */
router.get('/', function(req, res, next) {
  res.render('buyerLogin', {login_fail: false});
});

module.exports = router;
