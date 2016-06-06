var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});
var urlencode = require('urlencode');

router.get(':/category', function(req, res, next)
{
	pool.getConnection(function(err, conn)
	{
		if(err)
			console.error(err);

		var category = req.params.category;
		var board_title = 'bid';

		conn.query('use board');

			if(req.query.search_word == null)
			{
				conn.query('select count(*) as count from bid', function(err, result, field)
				{

				});
			});
	});
});
