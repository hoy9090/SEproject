
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

router.get('/', function(req, res, next)
{
	var type = req.query.type;
	var subtype = req.query.subtype;
	var typeString;

	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select buyer_comment from deal where SN=? order by SN desc', [type], function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('thread', {list: result, type: typeString});
		});
	});
});


module.exports = router;
