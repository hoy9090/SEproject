var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET index. */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select SN, name, type, subtype, price, img_url from Product order by SN desc limit(0, 4)', function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			for (var i=0; i<result.length; i++) {
				if (result[i].type == 0) {
					if (result[i].subtype == 0) {
						result[i].typeString = "Longboard";
					} else if (result[i].subtype == 1) {
						result[i].typeString = "Cruserboard";
					} else if (result[i].subtype == 2) {
						result[i].typeString = "Skateboard";
					}
				} else if (result[i].type == 1) {
					if (result[i].subtype == 0) {
						result[i].typeString = "Truck";
					} else if (result[i].subtype == 1) {
						result[i].typeString = "Wheel";
					} else if (result[i].subtype == 2) {
						result[i].typeString = "Deck";
					}
				} else if (result[i].type == 2) {
					if (result[i].subtype == 0) {
						result[i].typeString = "Cleaning";
					} else if (result[i].subtype == 1) {
						result[i].typeString = "Protects";
					}
				}
			}
			res.render('index', {list: result});
		});
	});
});

module.exports = router;
