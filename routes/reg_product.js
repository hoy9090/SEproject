var express = require('express');
var router = express.Router();

/* GET reg_product. */
router.get('/', function(req, res, next) {
	res.render('reg_product');
});

module.exports = router;
