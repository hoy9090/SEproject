var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET free_board_view. */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select serial_no as no, title, content, (select nickname from buyer where buyer.serial_no=free_topic.writter_SN) writter, date_format(date, "%Y-%m-%d %H:%i:%s") date, views from free_topic where serial_no=?', [req.query.no], function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			if (result)
				res.render('free_board_view', {result: result[0]});
			else
				res.redirect('free_board');
		});
	});
});

module.exports = router;
