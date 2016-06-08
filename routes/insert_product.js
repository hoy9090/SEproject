var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

router.post('/', function(req, res, next)
{
	pool.getConnection(function(err, conn)
	{
		if(err)
			console.error(err);
		conn.query('use board');
		
	});
});
