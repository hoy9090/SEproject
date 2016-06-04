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
					req.session.userno = result[0].serial_no;
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
<<<<<<< HEAD:routes/sign_FB.js
		res.redirect('/login');
=======
		res.redirect('/Login');
>>>>>>> 02580657a5169d59ccdf58f9b043b1c78769f616:routes/sign_FB.js
	}
});

module.exports = router;
