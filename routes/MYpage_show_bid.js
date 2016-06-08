var express = require('express');
var router = express.Router();

/* GET MYpage_show_bid */
router.get('/', function(req, res, next) {
	res.render('MYpage_show_bid');
});

module.exports = router;
