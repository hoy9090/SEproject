var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET MYpage_show_deal */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select SN, date from Deal where SN='+req.session.userno, function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_deal', {contents: result});
		});
	});
});

module.exports = router;
