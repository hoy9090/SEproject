var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* POST notice_search. */
router.post('/', function(req, res, next) {
	res.redirect('notice?search_word='+search_word+'&search_scope='+search_scope);
});

module.exports = router;
