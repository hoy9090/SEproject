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
	res.redirect('notice?search_word='+req.body.search_word+'&search_scope='+req.body.search_scope);
});

module.exports = router;
