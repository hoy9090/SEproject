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
		var deck_color = req.body.deck_color;
		var truck_color = req.body.truck_color;
		var wheel_color = req.body.wheel_color;
		var comment = req.body.comment;
		var queryString = "";
		if (deck_color != null)
			queryString = queryString.concat("deck_color='"+deck_color+"', ");
		if (truck_color != null)
			queryString = queryString.concat("truck_color='"+truck_color+"', ");
		if (wheel_color != null)
			queryString = queryString.concat("wheel_color='"+wheel_color+"', ");
		if (comment != null)
			queryString = queryString.concat("comment='"+comment+"', ");
		queryString = queryString.slice(0, -2);
		conn.query('update Customize set '+queryString+' where buyer_SN='+SN, function(err, result, field) {
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
