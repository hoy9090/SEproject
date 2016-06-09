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
		var queryString = "";
		if (type != '')
			queryString = queryString.concat("nickname='"+type+"', ");
		if (subtype != '')
			queryString = queryString.concat("nickname='"+subtype+"', ");
		if (name != '')
			queryString = queryString.concat("nickname='"+name+"', ");
		if (price != '')
			queryString = queryString.concat("phone_number='"+price+"', ");
		if (stock != '')
			queryString = queryString.concat("address='"+stock+"', ");
		if (img_url != '')
			queryString = queryString.concat("corp_num='"+img_url+"', ");
		if (color != '')
			queryString = queryString.concat("corp_num='"+color+"', ");
		queryString = queryString.slice(0, -2);
		console.log(queryString);
		conn.query('update Product set '+queryString+' where Seller_SN='+req.session.userno, function(err, result, field) {
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
