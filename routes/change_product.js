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
		var type = req.body.type;
		var subtype = req.body.subtype;
		var name = req.body.name;
		var price = req.body.price;
		var stock = req.body.stock;
		var img_url = req.body.img_url;
		var color = req.body.color;
		var queryString = "";
		console.log(SN, type, subtype, name, price, stock, img_url, color);
		if (type != null)
			queryString = queryString.concat("type='"+type+"', ");
		if (subtype != null)
			queryString = queryString.concat("subtype='"+subtype+"', ");
		if (name != null)
			queryString = queryString.concat("name='"+name+"', ");
		if (price != null)
			queryString = queryString.concat("price='"+price+"', ");
		if (stock != null)
			queryString = queryString.concat("stock='"+stock+"', ");
		if (img_url != null)
			queryString = queryString.concat("img_url='"+img_url+"', ");
		if (color != null)
			queryString = queryString.concat("color='"+color+"', ");
		queryString = queryString.slice(0, -2);
		console.log(queryString);
		console.log('update Product set '+queryString+' where SN='+SN);
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
