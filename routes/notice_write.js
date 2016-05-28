var express = require('express');
var router = express.Router();

/* GET notice_write page. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('notice_write');
	else
		res.redirect('notice');
});

module.exports = router;
