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
		var nickname = req.body.nickname;
		var phone_number = req.body.phone_number;
		var address = req.body.address;
		var corp_num = req.body.corp_num;
		var queryString = "";
		if (nickname != '')
			queryString = queryString.concat("nickname='"+nickname+"', ");
		if (phone_number != '')
			queryString = queryString.concat("phone_number='"+phone_number+"', ");
		if (address != '')
			queryString = queryString.concat("address='"+address+"', ");
		if (corp_num != '')
			queryString = queryString.concat("corp_num='"+corp_num+"', ");
		queryString = queryString.slice(0, -2);
		console.log(queryString);
		conn.query('update Member set '+queryString+' where SN='+req.session.userno, function(err, result, field) {
			conn.release();
			if (err) {
				console.error(err);
				res.send({reg_success: false});
			} else {
				res.send({reg_success: true});
			}
		});
	});
});

module.exports = router;
