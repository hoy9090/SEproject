var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});
var urlencode = require('urlencode');

/* GET community. */
router.get('/:category', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		var category = req.params.category;
		var board_title;
		if (category == 'Free') {
			board_title = 'Free Topic';
		} else if (category == 'Lecture') {
			board_title = 'Lectures';
		} else if (category == 'News') {
			board_title = 'News & Magazines';
		} else if (category == 'Notice') {
			board_title = 'Notice';
		} else {
			conn.release();
			res.redirect('/');			
		}
		conn.query('use board');
		if (req.query.search_word == null) {
			conn.query('select count(*) as count from Community_'+category, function(err, result, field) {
				if (err)
					console.error(err);
				var count = parseInt((result[0].count-1)/10)+1;
				if (req.query.pageNo == null) {
					conn.query('select SN as no, title, (select nickname from Member where Member.SN=Community_'+category+'.writer_SN) writer, date_format(date, "%Y-%m-%d") date, views from Community_'+category+' order by SN desc limit 0, 10', function(err, result, field) {
						if (err)
							console.error(err);
						conn.release();
						var page = [];
						if (count < 5)
							for (var i=0; i<count; i++)
								page.push(i+1);
						else
							page = [1, 2, 3, 4, 5];
						res.render('community', {board_title: board_title, category: category, contents: result, page: page, endpage: count, search: false});
					});
				} else {
					var pageNo = parseInt(req.query.pageNo);
					conn.query('select SN as no, title, (select nickname from Member where Member.SN=Community_'+category+'.writer_SN) writer, date_format(date, "%Y-%m-%d") date, views from Community_'+category+' order by SN desc limit ?, 10', [(pageNo-1)*10], function(err, result, field) {
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
						res.render('community', {board_title: board_title, category: category, contents: result, page: page, endpage: count, search: false});
					});
				}
			});
		} else {
			var search_word = urlencode.decode(req.query.search_word);
			var search_scope = urlencode.decode(req.query.search_scope);
			conn.query("select count(*) as count from (select title, contents, (select nickname from Member where Member.SN=Community_"+category+".writer_SN) writer from Community_"+category+") as a where "+search_scope+" like ?", ['%'+search_word+'%'], function(err, result, field) {
				if (err)
					console.error(err);
				var count = parseInt((result[0].count-1)/10)+1;
				if (req.query.pageNo == null) {
					conn.query("select * from (select SN as no, title, (select nickname from Member where Member.SN=Community_"+category+".writer_SN) writer, date_format(date, '%Y-%m-%d') date, views from Community_"+category+") as a where "+search_scope+" like ? order by no desc limit 0, 10", ['%'+search_word+'%'], function(err, result, field) {
						if (err)
							console.error(err);
						conn.release();
						var page = [];
						if (count < 5)
							for (var i=0; i<count; i++)
								page.push(i+1);
						else
							page = [1, 2, 3, 4, 5];
						res.render('community', {board_title: board_title, category: category, contents: result, page: page, endpage: count, search: true, search_scope: search_scope, search_word: search_word});
					});
				} else {
					var pageNo = parseInt(req.query.pageNo);
					conn.query("select * from (select SN as no, title, contents, (select nickname from Member where Member.SN=Community_"+category+".writer_SN) writer, date_format(date, '%Y-%m-%d') date, views from Community_"+category+") as a where "+search_scope+" like ? order by no desc limit ?, 10", ['%'+search_word+'%', (pageNo-1)*10], function(err, result, field) {
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
						res.render('community', {board_title: board_title, category: category, contents: result, page: page, endpage: count, search: true, search_scope: search_scope, search_word: search_word});
					});
				}
			});
		}
	});
});

router.get('/:category/write', function(req, res, next) {
	var category = req.params.category;

	if (req.session.userno) {
		var board_title;
		if (category == 'Free') {
			board_title = 'Free Topic';
		} else if (category == 'Lecture') {
			board_title = 'Lectures';
		} else if (category == 'News') {
			board_title = 'News & Magazines';
		} else if (category == 'Notice') {
			board_title = 'Notice';
		} else {
			res.redirect('/');
		}
		res.render('community_write', {board_title: board_title, category: category});
	}	else {
		res.redirect('/community/'+category);
	}
});

router.post('/:category/insert', function(req, res, next) {
	var category = req.params.category;

	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('insert into Community_'+category+'(title, contents, writer_SN, date) values(?, ?, ?, now())', [req.body.title, req.body.content, req.session.userno], function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.redirect('/community/'+category);
		});
	});
});

router.get('/:category/view', function(req, res, next) {
	var category = req.params.category;
	var board_title;
	if (category == 'Free') {
		board_title = 'Free Topic';
	} else if (category == 'Lecture') {
		board_title = 'Lectures';
	} else if (category == 'News') {
		board_title = 'News & Magazines';
	} else if (category == 'Notice') {
		board_title = 'Notice';
	} else {
		res.redirect('/');
	}

	pool.getConnection(function(err, conn) {
		if (err)
			console.error(err);
		conn.query('use board');
		conn.query('select SN as no, title, contents, (select nickname from Member where Member.SN=Community_'+category+'.writer_SN) writer, date_format(date, "%Y-%m-%d %H:%i:%s") date, views from Community_'+category+' where SN=?', [req.query.no], function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			if (result)
				res.render('community_view', {board_title: board_title, result: result[0]});
			else
				res.redirect('/community/'+category);
		});
	});
});

router.post('/:category/search', function(req, res, next) {
	var category = req.params.category;

	res.redirect('/community/'+category+'?search_word='+urlencode(req.body.search_word)+'&search_scope='+urlencode(req.body.search_scope));
});

module.exports = router;
