var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET notice.jade page. */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select serial_no as no, title, (select nickname from buyer where buyer.serial_no=notice.writter_SN) writter, date_format(date, "%Y-%m-%d") date, views from notice order by serial_no desc', function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('notice', {contents: result});
		});
	});
});

module.exports = router;
