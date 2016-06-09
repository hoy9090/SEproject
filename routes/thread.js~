var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool
({
	host: 'localhost',
	user: 'root',
	password: '1234'

});


router.get('/', function(req, res, next)
{
	var type = req.query.type;
	var subtype = req.query.subtype;
	var typeString;
	if (type == 0) {
		if (subtype == 0) {
			typeString = "Longboard";
		} else if (subtype == 1) {
			typeString = "Cruserboard";
		} else if (subtype == 2) {
			typeString = "Skateboard";
		}
	} else if (type == 1) {
		if (subtype == 0) {
			typeString = "Truck";
		} else if (subtype == 1) {
			typeString = "Wheel";
		} else if (subtype == 2) {
			typeString = "Deck";
		}
	} else if (type == 2) {
		if (subtype == 0) {
			typeString = "Cleaning";
		} else if (subtype == 1) {
			typeString = "Protects";
		}
	}
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select SN, name, price, img_url from Product where type=? and subtype=? order by SN desc', [type, subtype], function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('product_list', {list: result, type: typeString});
		});
	});
});

module.exports = router;
