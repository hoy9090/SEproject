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
		var type = req.body.type;
		var subtype = req.body.subtype;
		var name = req.body.name;
		var price = req.body.price;
		var stock = req.body.stock;
		var img_url = req.body.img_url;
		var color = req.body.color;
		var queryString = "";
		if (type != '')
			queryString = queryString.concat("type='"+type+"', ");
		if (subtype != '')
			queryString = queryString.concat("subtype='"+subtype+"', ");
		if (name != '')
			queryString = queryString.concat("name='"+name+"', ");
		if (price != '')
			queryString = queryString.concat("price='"+price+"', ");
		if (stock != '')
			queryString = queryString.concat("stock='"+stock+"', ");
		if (img_url != '')
			queryString = queryString.concat("img_url='"+img_url+"', ");
		if (color != '')
			queryString = queryString.concat("color='"+color+"', ");
		queryString = queryString.slice(0, -2);
		console.log(queryString);
		conn.query('update Product set '+queryString+' where SN='+SN, function(err, result, field) {
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
