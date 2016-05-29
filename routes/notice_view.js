var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});
var board_title = "Notice";
var category = "notice";

/* GET notice_view. */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select serial_no as no, title, content, (select nickname from buyer where buyer.serial_no=notice.writter_SN) writter, date_format(date, "%Y-%m-%d %H:%i:%s") date, views from notice where serial_no=?', [req.query.no], function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			if (result)
				res.render('notice_view', {board_title: board_title, category: category, result: result[0]});
			else
				res.redirect('notice');
		});
	});
});

module.exports = router;
