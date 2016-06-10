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
	var no = req.query.no;

	pool.getConnection(function(err, conn){
		if(err)
			console.error(err);
		conn.query('use board');
		conn.query('select * from Product where SN=?', [no], function(err, result, field){
			if(err)
				console.error(err);
			conn.release();
			res.render('product_detail', {product: result[0]});

		});
	});
});

module.exports = router;
