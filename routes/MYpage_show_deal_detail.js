var express = require('express');
var router = express.Router();
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET MYpage_show_deal_detail */
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
		conn.query('select SN, order_SN, date, seller_comment, buyer_comment from Deal (select '+queryString+' from `Order` where Deal.order_SN=`Order`.SN)='+req.session.userno, function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_deal_detail', {info: result[0]});
		});
	});
});

module.exports = router;
