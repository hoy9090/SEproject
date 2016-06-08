var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next)
{
	res.render('payment');
});

router.post('/', function(req, res, next) {
  res.render('payment', {email: req.body.email, name: req.body.name});
});

module.exports = router;
