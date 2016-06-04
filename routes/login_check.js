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
  	conn.query('select count(*) as count, SN from Member where ID=? and PW=?', [req.body.email, req.body.pw], function(err, result, field) {
  		if (err)
  			console.error(err);
      conn.release();
      if (result[0].count == 1) {
        req.session.userno = result[0].SN;
        res.send({login_success: true});
      } else {
        res.send({login_success: false});
      }
  	});
  });
});

module.exports = router;
