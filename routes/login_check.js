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
  	conn.query('select count(*) as count, serial_no from buyer where ID=? and PW=?', [req.body.email, req.body.pw], function(err, result, field) {
  		if (err)
  			console.error(err);
      conn.release();
      if (result.count === 1) {
        req.session.userno = result.serial_no;
        res.redirect('/');
      } else {
        res.render('log_in', {login_fail: true});
      }
  	});
  });
});

module.exports = router;
