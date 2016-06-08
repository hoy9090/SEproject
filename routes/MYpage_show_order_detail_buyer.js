var express = require('express');
var router = express.Router();

/* GET MYpage_show_order_detail */
router.get('/', function(req, res, next) {
	res.render('MYpage_show_order_detail_buyer');
});

module.exports = router;
