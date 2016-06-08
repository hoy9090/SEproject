var express = require('express');
var router = express.Router();

/* GET MYpage_show_bid_detail */
router.get('/', function(req, res, next) {
	res.render('MYpage_show_bid_detail');
});

module.exports = router;
