var express = require('express');
var router = express.Router();

/* GET about. */
router.get('/', function(req, res, next) {
	res.render('order_complete');
});

module.exports = router;
