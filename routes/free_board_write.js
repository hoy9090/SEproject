var express = require('express');
var router = express.Router();

/* GET free_board_write. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('free_board_write');
	else
		res.redirect('free_board');
});

module.exports = router;
