var express = require('express');
var router = express.Router();

/* GET log_in page. */
router.get('/', function(req, res, next) {
  res.render('log_in', {login_fail: false});
});

module.exports = router;
