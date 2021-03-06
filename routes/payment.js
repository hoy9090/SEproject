var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET payment. */
router.get('/', function(req, res, next)
{
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select SN, amount, product_SN as no, (select name from Product where Product.SN=Shopping_cart.product_SN) as name, (select img_url from Product where Product.SN=Shopping_cart.product_SN) as img_url, (select price from Product where Product.SN=Shopping_cart.product_SN) as price from Shopping_cart where Shopping_cart.buyer_SN=?', [req.session.userno], function(err, result, field) {
			if (err)
				console.error(err);
			var list = result;
			conn.query('select address, phone_number from Member where SN='+req.session.userno, function(err, result, field) {
				if (err)
					console.error(err);
				conn.release();
		  	res.render('payment', {list: list, address: result[0].address, phone_number: result[0].phone_number});
			});
		});
	});
});

module.exports = router;
