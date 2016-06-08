var express = require('express');
var router = express.Router();

/* GET MYpage_show_deal. */
router.get('/', function(req, res, next) {
	res.render('MMYpage_show_deal_detail');
});

module.exports = router;
