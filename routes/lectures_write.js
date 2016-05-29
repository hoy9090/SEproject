var express = require('express');
var router = express.Router();

/* GET notice_write. */
router.get('/', function(req, res, next)
{
	if (req.session.userno)
		res.render('lectures_write');
	else
		res.redirect('lectures');
});

module.exports = router;
