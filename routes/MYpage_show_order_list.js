var express = require('express');
var router = express.Router();

/* GET about. */
router.get('/', function(req, res, next) {
	res.render('MYpage_show_order_list');
});

module.exports = router;
