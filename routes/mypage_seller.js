var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/*var pool = mysql.createPool(
{
	host: 'localhost',
	user: 'root',
	password: '1234'
}
);*/
var urlencode = require('urlencode');

router.get('/', function(req, res, next)
{
	res.render('mypage_seller');

	

});

module.exports = router;
