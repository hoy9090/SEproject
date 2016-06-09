var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET index. */
router.get('/', function(req, res, next) {
	res.render('index');
});

module.exports = router;
