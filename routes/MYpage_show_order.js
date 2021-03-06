var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET MYpage_show_order. */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		var isBuyer = req.session.isBuyer;
		var queryString;
		if (isBuyer)
			queryString = 'buyer_SN';
		else
			queryString = 'seller_SN';
		conn.query('use board');
		conn.query('select SN, date, total_price, (select state from Payment where Payment.order_SN=`Order`.SN) from `Order` where `Order`.'+queryString+'=?', [req.session.userno], function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			var str;
			if (isBuyer)
				str = "buyer";
			else
				str = "seller";
			res.render('MYpage_show_order', {contents: result, str: str});
		});
	});
});

module.exports = router;
