var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET MYpage_show_customizing_detail */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select board_type, buyer_SN, deck_SN, deck_color, wheel_SN, wheel_color, truck_SN, truck_color, comment from Customize where buyer_SN='+req.sessison.userno, function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_customizing', {info: result[0]});
		});
	});
});

module.exports = router;
