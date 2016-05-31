var express = require('express');
var router = express.Router();

/* GET sellerLogin. */
router.get('/', function(req, res, next) {
  res.render('sellerLogin', {login_fail: false});
});

module.exports = router;
