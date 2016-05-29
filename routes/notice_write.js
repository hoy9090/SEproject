var express = require('express');
var router = express.Router();
var board_title = "Notice";

/* GET notice_write. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('notice_write', {board_title: board_title});
	else
		res.redirect('notice');
});

module.exports = router;
