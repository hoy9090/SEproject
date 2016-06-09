var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET MYpage_show_stock */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select SN, name from Product', function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_stock', {contents: result});
		});
	});
});

module.exports = router;
