var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next)
{
	res.render('mypage_buyer');
});

module.exports = router;
