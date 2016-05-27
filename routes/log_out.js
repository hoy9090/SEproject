var express = require('express');
var router = express.Router();

/* Log out. */
router.get('/', function(req, res, next) {
	req.session.destroy();
  res.redirect('/');
});

module.exports = router;