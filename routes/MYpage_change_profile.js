var express = require('express');
var router = express.Router();

/* GET about. */
router.get('/', function(req, res, next) {
	res.render('MYpage_change_profile');
});

module.exports = router;
