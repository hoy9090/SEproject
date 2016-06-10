var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* POST get_board. */
router.post('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		var type = req.body.type;
		var subtype = req.body.subtype;

		conn.query('use board');
		conn.query('select SN, price, img_url from Product where type=1 and subtype='+subtype, function(err, result, field) {
			if (err) {
				console.error(err);
				conn.release();
				res.send({get_success: false});
			} else {
				conn.release();
				res.send({get_success: true, list: result});
			}
		});
	});
});

module.exports = router;
