var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* POST change_profile. */
router.post('/', function(req, res, next)
{
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		var nickname = req.nickname;
		var phone_number = req.phone_number;
		var address = req.address;
		var corp_num = req.corp_num;
		var queryString = "";
		if (nickname != '')
			queryString.append("nickname='"+nickname+"', ");
		if (phone_number != '')
			queryString.append("phone_number='"+phone_number+"', ");
		if (address != '')
			queryString.append("address='"+address+"', ");
		if (corp_num != '')
			queryString.append("corp_num='"+corp_num+"', ");
		queryString = queryString.slice(0, -2);
		conn.query('update Member set '+queryString+' where SN='+req.session.userno, function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('mypage_seller', {info: result[0]});		
		});
	});
});

module.exports = router;
