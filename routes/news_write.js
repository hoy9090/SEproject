var express = require('express');
var router = express.Router();
var board_title = "News & Magazines";
var category = "news";

/* GET news_write. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('news_write', {board_title: board_title, category: category});
	else
		res.redirect('news');
});

module.exports = router;
