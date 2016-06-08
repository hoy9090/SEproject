var express = require('express');
var router = express.Router();

/* GET MYpage_show_bid_candidate */
router.get('/', function(req, res, next) {
	res.render('MYpage_show_bid_candidate');
});

module.exports = router;
