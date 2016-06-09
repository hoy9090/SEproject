var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* POST change_product. */
router.post('/', function(req, res, next)
{
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		console.log(req.body);
		var SN = req.body.NO;
		var total_price = req.body.total_price;
		var queryString = "";
		if (total_price != null)
			queryString = queryString.concat("total_price='"+total_price+"', ");
		queryString = queryString.slice(0, -2);
		conn.query('update `Order` set '+queryString+' where `Order`.seller_SN='+req.session.userno, function(err, result, field) {
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
