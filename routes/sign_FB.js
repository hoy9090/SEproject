var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* POST sign_FB. */
router.post('/', function(req, res, next) {
	var userid = req.body.id;
	if (userid) {
		pool.getConnection(function(err, conn) {
			if (err) 
				console.error(err);
			conn.query('use board');
			conn.query('select count(*) as count, SN from Member where ID=?', [req.body.email], function(err, result, field) {
				if (err)
					console.error(err);
				conn.release();
				var isAlreadyUser = result[0].count;
				if (isAlreadyUser == 1) {
					req.session.userno = result[0].SN;
					res.end();
				} else {
					res.json({
	          name    : req.body.name, 
	          email		: req.body.email
	        });
				}
			});
		});
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
