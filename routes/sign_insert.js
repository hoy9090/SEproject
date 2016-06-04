var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* POST signup_insert. */
router.post('/', function(req, res, next) {
  pool.getConnection(function(err, conn) {
  	if (err)
  		console.error(err);
  	conn.query('use board');
  	conn.query('insert into Member(ID, PW, name, nickname, phone_number, address, corp_num) values(?, ?, ?, ?, ?, ?, ?)', [req.body.email, req.body.pw, req.body.name, req.body.nickname, req.body.phone, req.body.address, req.body.corp_num], function(err, result, field) {
  		if (err)
  			console.error(err);
  		conn.release();
  		res.redirect('/');
  	});
  });
});

module.exports = router;
