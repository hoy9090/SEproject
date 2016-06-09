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
		var SN = req.body.NO;
		var price = req.body.price;
		var comment = req.body.comment;
		var queryString = "";
		if (price != null)
			queryString = queryString.concat("price='"+price+"', ");
		if (comment != null)
			queryString = queryString.concat("comment='"+comment+"', ");
		queryString = queryString.slice(0, -2);
		conn.query('update Bid_candidate set '+queryString+' where seller_SN='+SN, function(err, result, field) {
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
