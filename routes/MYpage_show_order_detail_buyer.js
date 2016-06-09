var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET MYpage_show_order_detail_buyer */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select SN, date, seller_SN, buyer_SN, total_price, (select state from Payment where Payment.order_SN=`Order`.SN) from `Order` where buyer_SN='+req.session.userno, function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_order_detail_buyer', {info: result[0]});
		});
	});
});

module.exports = router;
