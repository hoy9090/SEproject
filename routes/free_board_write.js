var express = require('express');
var router = express.Router();
var board_title = "Free Topic";
var category = "free_board";

/* GET free_board_write. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('community_write', {board_title: board_title, category: category});
	else
		res.redirect('free_board');
});

module.exports = router;
