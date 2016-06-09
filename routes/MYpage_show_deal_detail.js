var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET MYpage_show_deal_detail */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		var isBuyer = req.session.isBuyer;
		conn.query('use board');
		conn.query('select SN, order_SN, date, seller_comment, buyer_comment from Deal where SN='+req.query.number, function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_deal_detail', {info: result[0]});
		});
	});
});

module.exports = router;
