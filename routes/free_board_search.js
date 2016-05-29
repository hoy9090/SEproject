var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});
var urlencode = require('urlencode');

/* POST free_board_search. */
router.post('/', function(req, res, next) {
	res.redirect('/free_board?search_word='+urlencode(req.body.search_word)+'&search_scope='+urlencode(req.body.search_scope));
});

module.exports = router;
