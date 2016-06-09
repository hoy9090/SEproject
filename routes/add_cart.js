var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* POST add_cart. */
router.post('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		var no = req.body.no;
		conn.query('use board');
		conn.query('select product_SN, buyer_SN from Shopping_cart where product_SN=? and buyer_SN=?', [no, req.session.userno], function(err, result, field) {
			if (err)
				console.error(err);
			console.log(result.length);
			if (result.length != 0) {
				conn.query('insert into Shopping_cart(amount, product_SN, buyer_SN) values(1, ?, ?)', [no, req.session.userno], function(err, result, field) {
					if (err)
						console.error(err);
					conn.release();
					res.send({already: false});
				});
			} else {
				conn.release();
				res.send({already: true});
			}
		});
	});
});

module.exports = router;
