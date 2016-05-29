var express = require('express');
var router = express.Router();
var board_title = "Notice";
var category = "notice";

/* GET notice_write. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('notice_write', {board_title: board_title, category: category});
	else
		res.redirect('notice');
});

module.exports = router;
