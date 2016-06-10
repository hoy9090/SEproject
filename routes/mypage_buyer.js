var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET mypage_buyer. */
router.get('/', function(req, res, next)
{
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select name, nickname, phone_number, address, img_url from Member where SN='+req.session.userno, function(err, result, field) {
			if (err)
				console.error(err);

			conn.query('select SN, title, views from Community_Free where writer_SN='+req.session.userno, function(err2, result2, field2) {

				conn.release();
				res.render('mypage_buyer', {info: result[0], info2: result2});
			});
		});
	});
});

module.exports = router;
