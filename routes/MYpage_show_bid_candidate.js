var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET MYpage_show_bid_candidate */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		var isBuyer = req.session.isBuyer;
		var queryString;
		if (isBuyer)
			queryString = 'buyer_SN';
		else
			queryString = 'seller_SN';
		conn.query('use board');
		conn.query('select seller_SN, price, comment from Bid_candidate where (select buyer_SN from `Order` where `Order`.SN=Bid_candidate.customize_SN)='+req.session.userno,  function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_bid_candidate', {contents: result});
		});
	});
});

module.exports = router;
