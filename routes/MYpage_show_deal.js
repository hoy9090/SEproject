var express = require('express');
var router = express.Router();

/* GET MYpage_show_deal */
router.get('/', function(req, res, next) {
	res.render('MYpage_show_deal');
});

module.exports = router;
