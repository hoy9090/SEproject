var express = require('express');
var router = express.Router();

/* GET news_write. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('news_write');
	else
		res.redirect('news');
});

module.exports = router;
