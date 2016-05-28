var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});

/* GET free_board.jade page. */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select count(*) as count from free_topic', function(err, result, field) {
			if (err)
				console.error(err);
			var count = parseInt((result[0].count-1)/10)+1;
			if (req.query.pageNo == null) {
				conn.query('select serial_no as no, title, (select nickname from buyer where buyer.serial_no=free_topic.writter_SN) writter, date_format(date, "%Y-%m-%d") date, views from free_topic order by serial_no desc limit 0, 10', function(err, result, field) {
					if (err)
						console.error(err);
					conn.release();
					var page = [];
					if (count < 5)
						for (var i=0; i<count; i++)
							page.push(i+1);
					else
						page = [1, 2, 3, 4, 5];
					res.render('free_board', {contents: result, page: page, endpage: count});
				});
			} else {
				var pageNo = parseInt(req.query.pageNo);
				conn.query('select serial_no as no, title, (select nickname from buyer where buyer.serial_no=free_topic.writter_SN) writter, date_format(date, "%Y-%m-%d") date, views from free_topic order by serial_no desc limit ?, 10', [(pageNo-1)*10], function(err, result, field) {
					if (err)
						console.error(err);
					conn.release();
					var page = [];
					var pageCount = 0;
					for (var i=-4; ; i++) {
						if (pageNo+i > 0) {
							page.push(pageNo+i);
							pageCount++;
						}
						if (pageNo+i == count)
							break;
						if (pageCount == 9)
							break;
					}
					res.render('free_board', {contents: result, page: page, endpage: count});
				});
			}
		});
	});
});

module.exports = router;
