var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool
({
	host: 'localhost',
	user: 'root',
	password: '1234'

});


router.get('/', function(req, res, next)
{
	var type = req.query.threadno;

	pool.getConnection(function(err, conn)
	{
		if(err)
			console.error(err);

		conn.query('use deal');
		conn.query('select date, buyer_comment, seller_comment where SN=?', [threadno], function(err, result, field)
		{
			if(err)
				console.error(err);
			conn.release();
			res.render('thread', {list:result});

		});

	});

	res.render('thread');	
});

module.exports = router;
