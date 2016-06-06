var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next)
{
	res.render('mypage_seller');
});

module.exports = router;
