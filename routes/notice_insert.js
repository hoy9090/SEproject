var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* POST notice_insert. */
router.post('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('insert into notice(title, content, writter_SN, date) values(?, ?, ?, now())', [req.body.title, req.body.content, req.session.userno], function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.redirect('notice');
		});
	});
});

module.exports = router;
