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
		conn.query('select order_SN, product_SN, amount from Order_list where SN='+req.query.number, function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_order_list', {info: result[0]});
		});
	});
});

module.exports = router;
