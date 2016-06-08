var express = require('express');
var router = express.Router();

/* GET MYpage_show_order. */
router.get('/', function(req, res, next) {
	res.render('MYpage_show_order');
});

module.exports = router;
