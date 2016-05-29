var express = require('express');
var router = express.Router();
var board_title = "Lectures";
var category = "lectures";

/* GET notice_write. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('lectures_write', {board_title: board_title, category: category});
	else
		res.redirect('lectures');
});

module.exports = router;
